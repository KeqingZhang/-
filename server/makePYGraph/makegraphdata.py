import json

def makegraphdata():
    courseinTerm = []
    for i in range(6):
        courseinTerm.append([])

    course_level = []
    for i in range(6):
        course_level.append([])

    course_relation = []

    with open("courseData.json", "r", encoding="utf-8") as f:
        content = json.load(f)
        for course in content:
            course_level[course["term"]-1].append(course["name"])
            item = {course["name"]: (len(courseinTerm[course["term"]-1]), course["term"])}
            courseinTerm[course["term"]-1].append(item)
            for relation in course["pre_course"]:
                course_relation.append({
                    "source":relation,
                    "target":course["name"],
                    "label": {
                        "show": "false"
                    },
                    "lineStyle": {
                        "curveness": 0.2,\
                        "color":"#333",
                    }
                                        })
    term_name = [
        "大一上半学期",
        "大一下半学期",
        "大二上半学期",
        "大二下半学期",
        "大三上半学期",
        "大三下半学期",
    ]

    course_position = []

    for i in range(len(term_name)):
        course_position.append({
                "name":str(term_name[i]),
                "x":100*(i+1),
                "y":200})


    for i in range(len(course_level)):
        for j in range(len(course_level[i])):
            course_position.append({
                "name":str(course_level[i][j]),
                "x":100*(i+1),
                "y":200*(j+2)})
    # print(course_position)
    path_position = r'C:\Users\86152\Desktop\大三上课件资料\数据结构课设\changepage\src\page\planshow\coursePosition.json'
    path_relation = r'C:\Users\86152\Desktop\大三上课件资料\数据结构课设\changepage\src\page\planshow\courseRelation.json'
    # course_position = json.dumps(course_position)
    with open(path_position, 'w', encoding='utf-8') as f:
        json.dump(course_position, f, ensure_ascii=False, indent=2)
    
    with open(path_relation, 'w', encoding='utf-8') as f:
        json.dump(course_relation, f, ensure_ascii=False, indent=2)
