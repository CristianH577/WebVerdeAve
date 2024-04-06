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
def index():
    return {"answer": "svon"}


# functions ----------------------------------------------------------------------------------------------
def getDtypes(df):
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
@app.post("/file_to_df/")
async def file_to_df(file: UploadFile | None = None):
    contents = file.file

    if not contents:
        raise HTTPException(status_code=204, detail="sin contenido")
    else:
        bool = True
        df = ""

        name = file.filename
        if name.endswith(".csv"):
            df = pd.read_csv(contents)
        elif name.endswith((".xls", ".xlsx")):
            df = pd.read_excel(contents)
        else:
            bool = False
            raise HTTPException(status_code=400, detail="formato invalido")

        if bool:
            df["key"] = df.index
            cols = list(df.columns)
            cols.remove("key")
            response = {"cols": cols, "rows": df.to_json(orient="records")}

    return response


# procesamiento -------------------------------------
@app.post("/info/")
def info(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)
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

        response = {"cols": cols, "rows": df_info.to_json(orient="records")}

    return response


@app.post("/describe/")
def describe(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        describe = df.describe(include="all")

        df = pd.DataFrame(describe)
        df = df.drop(["key"], axis=1)
        df = df.transpose()
        df.insert(0, "Column", df.index)
        df.insert(0, "key", df.index)

        cols = list(df.columns)
        cols.remove("key")

        response = {"cols": cols, "rows": df.to_json(orient="records")}

    return response


@app.post("/isnull/")
def isnull(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        df_isnull = df.isnull()
        df_isnull["key"] = df_isnull.index

        cols = list(df_isnull.columns)
        cols.remove("key")

        response = {"cols": cols, "rows": df_isnull.to_json(orient="records")}

    return response


@app.post("/notnull/")
def notnull(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        df_notnull = df.notnull()
        df_notnull["key"] = df_notnull.index

        cols = list(df_notnull.columns)
        cols.remove("key")

        response = {"cols": cols, "rows": df_notnull.to_json(orient="records")}

    return response


# changes -------------------------------------
@app.post("/editHeaders/")
def editHeaders(
    rows: Annotated[str, Form()] = None,
    newKeys: Annotated[str, Form()] = None,
):

    if not rows:
        raise HTTPException(status_code=400, detail="sin filas")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        newKeys = loads(newKeys)

        df.rename(columns=newKeys, inplace=True)

        cols = list(df.columns)
        cols.remove("key")

        response = {"cols": cols, "rows": df.to_json(orient="records")}

        addData = getDtypes(df)
        response |= addData

    return response


@app.post("/getDtype/")
def getDtype(rows: Annotated[str, Form()] = None):

    if not rows:
        raise HTTPException(status_code=400, detail="sin filas")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        response = getDtypes(df)

    return response


@app.post("/changeDtype/")
def changeDtype(
    rows: Annotated[str, Form()] = None, dtypes: Annotated[str, Form()] = None
):

    if not (rows or dtypes):
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        dtypesDIC = loads(dtypes)

        df1 = df.astype(dtypesDIC)
        response = {"rows": df1.to_json(orient="records")}

        addData = getDtypes(df1)
        response |= addData

    return response


@app.post("/editRows/")
def editRows(
    rows: Annotated[str, Form()] = None, newValues: Annotated[str, Form()] = None
):
    if not (rows or newValues):
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        newValuesDIC = loads(newValues)

        for k, v in newValuesDIC.items():
            df.loc[df["key"] == int(k), list(v.keys())] = list(v.values())

        response = {"rows": df.to_json(orient="records")}

    return response


@app.post("/filter/")
def filter(rows: Annotated[str, Form()] = None, filters: Annotated[str, Form()] = None):

    if not (rows or filters):
        raise HTTPException(status_code=400, detail="sin data")
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

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

        response = {"rows": df.to_json(orient="records")}

    return response


# Graphs -------------------------------------
@app.post("/createImgPost/")
async def createImgPost(
    rows: Annotated[str, Form()] = None, preferences: Annotated[str, Form()] = None
):
    response = {"error": "execute"}

    if not (rows or preferences):
        response = {"error": "form"}
    else:
        rows = loads(rows)
        preferences = loads(preferences)
        print(preferences)

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
