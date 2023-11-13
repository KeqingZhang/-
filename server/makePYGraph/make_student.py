import json
import re


def cut_text(text, lenth):
    textArr = re.findall('.{'+str(lenth)+'}', text)
    textArr.append(text[(len(textArr)*lenth):])
    return textArr


def get_student(path):
    student_info = []
    name_index = None

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        name_index = cut_text(content, 3)[:-1]
        # print(name_index)
        course_temp = []
        for i in range(6):
            course_temp.append([[], 0])
        for name in name_index:
            student_info.append(
                {'username': name,'email': 'simpleStudent@qq.com', 'password': 123456, 'course': course_temp})

    return student_info


# student_info_path = r'student_info.txt'
# student_info = get_student(path=student_info_path)
# print(student_info)
