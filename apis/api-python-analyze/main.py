from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from typing import Annotated

from json import loads

import io

import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns


#  -----------------------------------------------------------------------------------------
app = FastAPI()
# uvicorn main:app --reload

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#  ----------------------------------------------------------------------------------------------
@app.get("/")
async def index():
    return {"detail": "sv on"}


# functions ----------------------------------------------------------------------------------------------
async def getDtypes(df: pd.DataFrame):
    dtypes = df.dtypes
    del dtypes["key"]

    dtypes_dic = {}
    dtypes_labels = {}
    for k, v in dtypes.items():
        dtypes_dic[k] = str(v)
        dtypes_labels[k] = k + "(" + str(v) + ")"

    data = {"dtypes": dtypes_dic, "labels": dtypes_labels}

    return data


# upload -------------------------------------
@app.post("/fileToDf/")
async def fileToDf(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="form")

    contents = file.file
    bool = True
    df = ""

    name = file.filename
    if name.endswith(".csv"):
        df = pd.read_csv(contents)
    elif name.endswith((".xls", ".xlsx")):
        df = pd.read_excel(contents)
    else:
        raise HTTPException(status_code=400, detail="format")

    if bool:
        df["key"] = df.index
        cols = list(df.columns)
        cols.remove("key")
        response = {"value": {"cols": cols, "rows": df.to_json(orient="records")}}

        return response


# process -------------------------------------
@app.post("/info/")
async def info(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)
    df.drop("key", axis=1, inplace=True)

    buf = io.StringIO()
    df.info(buf=buf)
    s = buf.getvalue()
    lines = [line.split() for line in s.splitlines()[3:-2]]
    del lines[1]
    cols = lines[0]
    del lines[0]
    df_info = pd.DataFrame(lines, columns=cols)

    df_info["key"] = df_info["Column"]

    response = {"value": {"cols": cols, "rows": df_info.to_json(orient="records")}}

    return response


@app.post("/describe/")
async def describe(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    describe = df.describe(include="all")

    df = pd.DataFrame(describe)
    df = df.drop(["key"], axis=1)
    df = df.transpose()
    df.insert(0, "Column", df.index)
    df.insert(0, "key", df.index)

    cols = list(df.columns)
    cols.remove("key")

    response = {"value": {"cols": cols, "rows": df.to_json(orient="records")}}

    return response


@app.post("/isnull/")
async def isnull(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    df_isnull = df.isnull()
    df_isnull["key"] = df_isnull.index

    cols = list(df_isnull.columns)
    cols.remove("key")

    response = {"value": {"cols": cols, "rows": df_isnull.to_json(orient="records")}}

    return response


@app.post("/notnull/")
async def notnull(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    df_notnull = df.notnull()
    df_notnull["key"] = df_notnull.index

    cols = list(df_notnull.columns)
    cols.remove("key")

    response = {"value": {"cols": cols, "rows": df_notnull.to_json(orient="records")}}

    return response


# changes -------------------------------------
@app.post("/editHeaders/")
async def editHeaders(
    rows: Annotated[str, Form()] = None,
    new_keys: Annotated[str, Form()] = None,
):

    if not (rows or new_keys):
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    new_keys = loads(new_keys)

    df.rename(columns=new_keys, inplace=True)

    cols = list(df.columns)
    cols.remove("key")

    data = {"cols": cols, "rows": df.to_json(orient="records")}

    add_data = await getDtypes(df)
    data |= add_data

    response = {"value": data}

    return response


@app.post("/getDtype/")
async def getDtype(rows: Annotated[str, Form()] = None):
    if not rows:
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)
    print(df)

    response = {"value": await getDtypes(df)}

    return response


@app.post("/changeDtype/")
async def changeDtype(
    rows: Annotated[str, Form()] = None, dtypes: Annotated[str, Form()] = None
):

    if not (rows or dtypes):
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    dtypes_dicc = loads(dtypes)

    try:
        df1 = df.astype(dtypes_dicc)
    except:
        raise HTTPException(status_code=404, detail="No se pudieron convertir los datos")
    
    data = {"rows": df1.to_json(orient="records")}

    add_data = await getDtypes(df1)
    data |= add_data

    response = {"value": data}
    return response


@app.post("/editRows/")
async def editRows(
    rows: Annotated[str, Form()] = None, new_values: Annotated[str, Form()] = None
):
    if not (rows or new_values):
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    newValuesDIC = loads(new_values)

    for k, v in newValuesDIC.items():
        df.loc[df["key"] == int(k), list(v.keys())] = list(v.values())

    response = {"value": {"rows": df.to_json(orient="records")}}

    return response


@app.post("/filter/")
async def filter(
    rows: Annotated[str, Form()] = None, filters: Annotated[str, Form()] = None
):

    if not (rows or filters):
        raise HTTPException(status_code=400, detail="form")

    data_dicc = loads(rows)
    df = pd.DataFrame(data_dicc)

    filters = loads(filters)

    cols = []
    if filters["cols"] != "":
        cols = [filters["cols"]]
    else:
        cols = df.columns

    if filters["num"] != "":

        def evaluate(x):
            t = isinstance(x, (int, float))
            if t:
                e = eval(str(x) + filters["cond_simbol"] + filters["num"])
                return e
            return False

    else:

        def evaluate(x):
            t = isinstance(x, str)
            if t:
                e = filters["text"] in x
                return e
            return False

    mask = pd.DataFrame()
    for col in cols:
        if col != "key":
            mask[col] = df[col].map(lambda x: evaluate(x))

    df = df[mask.any(axis=1)]

    if mask.any().any():

        def getHlCols(r):
            h = []
            for k, v in r.items():
                if v:
                    h.append(k)
            return h

        df["hl"] = mask.apply(getHlCols, axis=1)

    response = {"value": {"rows": df.to_json(orient="records")}}

    return response


# Graphs -------------------------------------
@app.post("/createImgPost/")
async def createImgPost(
    rows: Annotated[str, Form()] = None, preferences: Annotated[str, Form()] = None
):

    if not (rows or preferences):
        raise HTTPException(status_code=400, detail="form")

    rows = loads(rows)
    preferences = loads(preferences)

    df = pd.DataFrame(rows)

    x = ""
    y = ""
    plot = False
    x = preferences["ejex"][0]
    if preferences["ejey"] != []:
        y = preferences["ejey"][0]

    graph = preferences["type"]

    if graph == "bar":
        if y == ("" or "quantity"):
            data = df[preferences["ejex"]].value_counts()
            x = data.index.get_level_values(0).to_list()
            y = data.tolist()

        plot = sns.barplot(data=df, x=x, y=y)
    elif graph == "hist":
        plot = sns.histplot(data=df, x=x)
    elif graph == "pie":
        plot = True

        data = df[preferences["ejex"]].value_counts()
        x = data.index.get_level_values(0).to_list()
        y = data.tolist()

        plt.pie(y, labels=x, autopct="%.0f%%")
    elif graph == "boxplot":
        plot = sns.boxplot(data=df, x=x)
    elif graph == "scatter":
        plot = sns.regplot(data=df, x=x, y=y)
    elif graph == "line":
        plot = sns.lineplot(data=df, x=x, y=y)
    elif graph == "corr":
        plot = sns.heatmap(df.corr())

    if plot != False:
        buffer = io.BytesIO()

        if plot == True:
            plt.savefig(buffer, format="png")
        else:
            img = plot.get_figure()
            img.savefig(buffer, format="png")

        buffer.seek(0)

        response = StreamingResponse(buffer, media_type="image/png")
        plt.clf()

    return response
