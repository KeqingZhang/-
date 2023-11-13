import json
from collections import defaultdict

from DirectGraph import Graph
from make_student import get_student

student_info_path = r'student_info.txt'
Max_time = 280

course_content = []
course_index = []
course_limit = []
course_capacity = []
edge_list = []
course_term = []


with open("course_data.json", "r", encoding="utf-8") as f:
    content = json.load(f)
    course_content = content
    for course in content:
        course_index.append(course["name"])
        course_capacity.append(0)
        for pre_course in course["pre_course"]:
            edge_list.append([pre_course, course["name"]])

with open("course_limit.json", "r", encoding="utf-8") as f:
    content = json.load(f)
    for course in content:
        course_limit.append(course["class_capacity"])
        course_term.append(course["term"])

# print(edge_list)
# print(course_limit)
g = Graph(isDirected=True)

for edge in edge_list:
    g.addEdge(edge)

course_sequence = g.topoSortDfs1()

student_info = get_student(path=student_info_path)
# print(course_sequence)

print(course_capacity)

# print(student_info)
new_student_info = []
for student in student_info:
    # print('student:', student)
    tempStudent = {'username': student['username'],
                   'email': student['email'],
                   'password': student['password'],
                   'course': [[[], 0], [[], 0],
                              [[], 0], [[], 0],
                              [[], 0], [[], 0]],
                   }

    # print(tempStudent)
    for course in course_sequence:
        term = 0
        for temp in content:
            if (course == temp['name']):
                term = temp['term']
                pos = content.index(temp)
        # print(term)
        if course_capacity[course_index.index(course)] >= course_limit[course_index.index(course)]:
            continue

        if (tempStudent['course'][term-1][1]+course_content[course_index.index(
                course)]['credit_hour'] <= Max_time):
            tempStudent['course'][term-1][1] += course_content[course_index.index(
                course)]['credit_hour']
            course_capacity[pos] = course_capacity[pos]+1
            # print('所选课程为：', course)
            # print(pos)
            tempStudent['course'][term-1][0].append(course)
        else:
            continue
    new_student_info.append(tempStudent)

# print(new_student_info)
print(course_capacity)
_course_capacity = []

for i in range(len(course_capacity)):
    _course_capacity.append(
        {'name': course_index[i], 'resNumber': course_capacity[i],'totalCap':course_limit[i], 'term':course_term[i]})

print(_course_capacity)
with open('res_course_capacity.json', 'w', encoding='utf8') as f2:
    json.dump(_course_capacity, f2, ensure_ascii=False, indent=2)

with open('outcome.json', 'w', encoding='utf8') as f2:
    json.dump(new_student_info, f2, ensure_ascii=False, indent=2)
