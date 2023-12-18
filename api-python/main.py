from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse, StreamingResponse

from typing import Annotated

from json import loads

import io

import pandas as pd

import logging

import matplotlib.pyplot as plt
import seaborn as sns


#  -----------------------------------------------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(filename="./api.log", encoding="utf-8", level=logging.DEBUG)


@app.exception_handler(Exception)
async def catch_exception_handler(request: Request, exc: Exception):
    logging.error(exc)

    error = JSONResponse(
        status_code=404, content={"error": "handle", "errorValue": str(exc)}
    )
    return error


@app.exception_handler(TypeError)
async def catch_exception_handler(request: Request, exc: TypeError):
    logging.error(exc)

    error = JSONResponse(
        status_code=404, content={"error": "handle", "errorValue": str(exc)}
    )
    return error


@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    logging.error(exc)

    error = JSONResponse(content={"error": "handle", "errorValue": str(exc)})
    return error


#  ----------------------------------------------------------------------------------------------
@app.get("/")
def index():
    # raise Exception("Vamos a romper el proyecto")
    return {"answer": "svon"}


# funciones ----------------------------------------------------------------------------------------------
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


# direccioens ----------------------------------------------------------------------------------------------
# upload -------------------------------------
@app.post("/file_to_df/")
async def index(file: UploadFile | None = None):
    response = {"error": "execute"}
    contents = file.file

    if not contents:
        response = {"error": "form"}
    else:
        bool = True
        df = ""

        name = file.filename
        if name.endswith(".csv"):
            df = pd.read_csv(contents)
        # elif name.endswith((".xls", ".xlsx")):
        #     df = pd.read_excel(contents)
        else:
            bool = False
            response = {"error": "format"}

        if bool:
            df["key"] = df.index
            cols = list(df.columns)
            cols.remove("key")
            data = {"cols": cols, "rows": df.to_json(orient="records")}
            response = {"answer": data}

    return response


# procesamiento -------------------------------------
@app.post("/info/")
def index(rows: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
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

        data = {"cols": cols, "rows": df_info.to_json(orient="records")}
        response = {"answer": data}

    return response


@app.post("/describe/")
def index(rows: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
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

        data = {"cols": cols, "rows": df.to_json(orient="records")}
        response = {"answer": data}

    return response


@app.post("/isnull/")
def index(rows: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        df_isnull = df.isnull()
        df_isnull["key"] = df_isnull.index

        cols = list(df_isnull.columns)
        cols.remove("key")

        data = {"cols": cols, "rows": df_isnull.to_json(orient="records")}
        response = {"answer": data}

    return response


@app.post("/notnull/")
def index(rows: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        df_notnull = df.notnull()
        df_notnull["key"] = df_notnull.index

        cols = list(df_notnull.columns)
        cols.remove("key")

        data = {"cols": cols, "rows": df_notnull.to_json(orient="records")}
        response = {"answer": data}

    return response


# changes -------------------------------------
@app.post("/editHeaders/")
def index(
    rows: Annotated[str, Form()] = None,
    newKeys: Annotated[str, Form()] = None,
):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        newKeys = loads(newKeys)

        df.rename(columns=newKeys, inplace=True)

        cols = list(df.columns)
        cols.remove("key")

        data = {"cols": cols, "rows": df.to_json(orient="records")}

        addData = getDtypes(df)
        data |= addData

        response = {"answer": data}

    return response


@app.post("/getDtype/")
def index(rows: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not rows:
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        data = getDtypes(df)

        response = {"answer": data}

    return response


@app.post("/changeDtype/")
def index(rows: Annotated[str, Form()] = None, dtypes: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not (rows or dtypes):
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        dtypesDIC = loads(dtypes)

        df1 = df.astype(dtypesDIC)
        data = {"rows": df1.to_json(orient="records")}

        addData = getDtypes(df1)
        data |= addData

        response = {"answer": data}

    return response


@app.post("/editRows/")
def index(
    rows: Annotated[str, Form()] = None, newValues: Annotated[str, Form()] = None
):
    response = {"error": "execute"}

    if not (rows or newValues):
        response = {"error": "form"}
    else:
        dataDIC = loads(rows)
        df = pd.DataFrame(dataDIC)

        newValuesDIC = loads(newValues)

        for k, v in newValuesDIC.items():
            df.loc[df["key"] == int(k), list(v.keys())] = list(v.values())

        data = {"rows": df.to_json(orient="records")}

        response = {"answer": data}

    return response


@app.post("/filter/")
def index(rows: Annotated[str, Form()] = None, filters: Annotated[str, Form()] = None):
    response = {"error": "execute"}

    if not (rows or filters):
        response = {"error": "form"}
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

        data = {"rows": df.to_json(orient="records")}

        response = {"answer": data}

    return response


# Graphs -------------------------------------
# @app.get("/createImg/")
# async def index():
#     response = {"error": "execute"}
#     # plt.scatter(x = [1, 2, 3], y = [3, 2, 1])
#     plt.plot([1, 2, 3, 4])
#     buffer = io.BytesIO()
#     plt.savefig(buffer, format='png')
#     buffer.seek(0)

#     response = StreamingResponse(buffer, media_type="image/png")

#     return response


@app.post("/createImgPost/")
async def index(
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
        if(preferences["ejey"] != []):
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
