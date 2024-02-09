import os
import json
import csv


# Step 1
def list_files_and_folders(path="."):
    file_names = []

    try:
        # Level 1
        with os.scandir(path) as entries:
            for entry in entries:
                if entry.is_dir():

                    # Level 2
                    new_path = path + "//" + entry.name
                    with os.scandir(new_path) as entries:
                        for entry in entries:
                            if entry.is_dir():

                                # Level 3
                                newest_path = new_path + "//" + entry.name
                                with os.scandir(newest_path) as entries:
                                    for entry in entries:
                                        if entry.is_dir():

                                            # Level 4
                                            final_path = newest_path + "//" + entry.name
                                            with os.scandir(final_path) as entries:
                                                for entry in entries:
                                                    if entry.is_file():
                                                        path_to_save = (
                                                            final_path
                                                            + "//"
                                                            + entry.name
                                                        )
                                                        file_names.append(path_to_save)

    except Exception as e:
        print(f"Error: {e}")

    return file_names


# Step 2
def clean_file_names(file_names):
    cleaned_file_names = []

    for file_name in file_names:
        cleaned_file_names.append(file_name.split("//"))

    return cleaned_file_names


# Step 3
def get_only_recquired_path(cleaned_file_names):
    recquired_path = []

    for file_name in cleaned_file_names:
        recquired_path.append(file_name[2:])

    return recquired_path


def options(state_needed, district_needed, market_needed):
    states = []
    districts = []
    markets = []

    with open("./markets.json", "r") as file:
        data = json.load(file)
    for a in data:
        state = a["state"]
        states.append(state)

        if state == state_needed:
            for b in a["districts"]:
                district = b["district"]
                districts.append(district)

                if district == district_needed:
                    for c in b["markets"]:
                        markets.append(c["market"])

                        if c["market"] == market_needed:
                            return states, districts, markets, True

    return states, districts, markets, False


def get_commodities():
    commodities = []

    with open("./commodities.json", "r") as file:
        data = json.load(file)

    for a in data:
        c = a["commodity"]
        commodities.append(c)

    return commodities


def get_states():
    states = []

    with open("./markets.json", "r") as file:
        data = json.load(file)

    for a in data:
        s = a["state"]
        states.append(s)

    return states


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


if __name__ == "__main__":
    # directory_path = "data//CommodityData"
    # file_names = list_files_and_folders(directory_path)
    # cleaned_file_names = clean_file_names(file_names)
    # file_paths = get_only_recquired_path(cleaned_file_names)
    # for fp in file_paths:
    #     print(fp)

    # print(options("Gujarat", "Ahmedabad", "Ahmedabad"))
    # print(get_states())
    # print(get_districts("Gujarat"))
    # print(get_markets("Gujarat", "Ahmedabad"))
    print(get_commodities())
    print("Hello World")
    
