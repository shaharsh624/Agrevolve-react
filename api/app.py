from flask import Flask, jsonify
from flask_cors import CORS
import csv
import json

app = Flask(__name__)
CORS(app)


@app.route("/api/data", methods=["GET"])
def get_data():
    data = {"message": "Hello This is Flask API"}

    return jsonify(data)


@app.route("/get/data", methods=["GET"])
def get_api_data():
    csv_filename = (
        "data//CommodityData//Yam (Ratalu)//Gujarat//Ahmedabad//Ahmedabad.csv"
    )
    selected_columns = [
        "Min Price (Rs./Quintal)",
        "Max Price (Rs./Quintal)",
        "Modal Price (Rs./Quintal)",
        "Reported Date",
    ]

    data = []

    with open(csv_filename, "r") as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            selected_data = {column: row[column] for column in selected_columns}
            data.append(selected_data)

    return data


@app.route("/get_commodities", methods=["GET"])
def get_commodities():
    commodities = []

    with open("./commodities.json", "r") as file:
        data = json.load(file)

    for a in data:
        id = a["commodity_id"]
        c = a["commodity"]
        commodities.append({"id": id, "commodity": c})

    return commodities


@app.route("/get_states", methods=["GET"])
def get_states():
    states = []

    with open("./markets.json", "r") as file:
        data = json.load(file)

    for a in data:
        s = a["state"]
        states.append(s)

    return states


@app.route("/get_districts/<state>", methods=["GET"])
def get_districts(state):
    states = []
    districts = []

    with open("./markets.json", "r") as file:
        data = json.load(file)

    for a in data:
        s = a["state"]
        states.append(s)

        if s == state:
            for b in a["districts"]:
                districts.append(b["district"])

    return districts


@app.route("/get_markets/<state>/<district>", methods=["GET"])
def get_markets(state, district):
    states = []
    markets = []

    with open("./markets.json", "r") as file:
        data = json.load(file)

    for a in data:
        s = a["state"]
        states.append(s)

        if s == state:
            for b in a["districts"]:
                d = b["district"]

                if d == district:
                    for c in b["markets"]:
                        markets.append(c["market"])

    return markets


@app.route("/getData/<commodity>/<state>/<district>/<mandi>", methods=["get", "POST"])
def getData(commodity, state, district, mandi):
    csv_filename = f"data//CommodityData//{commodity}//{state}//{district}//{mandi}.csv"
    print(csv_filename)
    selected_columns = [
        "Min Price (Rs./Quintal)",
        "Max Price (Rs./Quintal)",
        "Modal Price (Rs./Quintal)",
        "Reported Date",
    ]

    data = []

    with open(csv_filename, "r") as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            selected_data = {column: row[column] for column in selected_columns}
            data.append(selected_data)

    if data:
        return data
    else:
        return ""
