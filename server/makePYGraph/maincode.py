import json
from .DirectGraph import Graph
from .make_student import get_student

def makeGraph(max_time = 280):

    Max_time = max_time
    course_content = []
    course_index = []
    course_limit = []
    course_capacity = []
    edge_list = []
    course_term = []

    with open("./courseData.json", "r", encoding="utf-8") as f:
        content = json.load(f)
        course_content = content
        for course in content:
            course_index.append(course["name"])
            course_capacity.append(0)
            for pre_course in course["pre_course"]:
                edge_list.append([pre_course, course["name"]])

    with open("./courseLimit.json", "r", encoding="utf-8") as f:
        content = json.load(f)
        for course in content:
            course_limit.append(course["class_capacity"])
            course_term.append(course["term"])

    # 创建有向无环图
    g = Graph(isDirected=True)
    for edge in edge_list:
        g.addEdge(edge)

    # 生成拓扑排序课程序列
    course_sequence = g.topoSortDfs1()

    # 获取学生信息，创建初始用户信息
    student_info = get_student(path=r'./makePYGraph/studentinfo.txt')

    new_student_info = []
    
    # 为所有的新用户排课
    for student in student_info:
        tempStudent = {'username': student['username'],
                    'email': student['email'],
                    'password': student['password'],
                    'course': [[[], 0], [[], 0],
                                [[], 0], [[], 0],
                                [[], 0], [[], 0]],
                    }
        # 遍历课程拓扑图，给每个学生进行排课
        for course in course_sequence:
            term = 0
            for temp in content:
                if (course == temp['name']):
                    term = temp['term']
                    pos = content.index(temp)
            # 如果该课堂人数满了，则不选择该课程
            if course_capacity[course_index.index(course)] >= course_limit[course_index.index(course)]:
                continue
            
            # 如果添加该课堂没有超过该学生本学期的课程上限，则选择该课程
            if (tempStudent['course'][term-1][1]+course_content[course_index.index(
                    course)]['credit_hour'] <= Max_time):
                tempStudent['course'][term-1][1] += course_content[course_index.index(
                    course)]['credit_hour']
                course_capacity[pos] = course_capacity[pos]+1
                tempStudent['course'][term-1][0].append(course)
            else:
                continue

    new_student_info.append(tempStudent)

    _course_capacity = []

    for i in range(len(course_capacity)):
        _course_capacity.append(
            {'name': course_index[i], 'resNumber': course_capacity[i],'totalCap':course_limit[i], 'term':course_term[i]})

    with open('../resCoursecapacity.json', 'w', encoding='utf8') as f2:
        json.dump(_course_capacity, f2, ensure_ascii=False, indent=2)

    with open('../data.json', 'w', encoding='utf8') as f2:
        json.dump(new_student_info, f2, ensure_ascii=False, indent=2)