import json

with open("./course_data.json", "r", encoding="utf-8") as f:
    json_str_1 = json.load(f)

with open("./course_limit.json", "r", encoding="utf-8") as g:
    json_str_2 = json.load(g)

merged_data = {}

for data in [json_str_1, json_str_2]:
    for item in data:
        if item["name"] in merged_data:
            merged_data[item["name"]].update(item)
        else:
            merged_data[item["name"]] = item

# print(merged_data.values())
# 将合并后的数据保存到本地
with open('merged_file.json', 'w', encoding="utf-8") as k:
    json.dump(merged_data, k)
