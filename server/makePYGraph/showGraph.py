import json
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt

def showGraph():
    courseinTerm = []
    for i in range(6):
        courseinTerm.append([])

    course_level = []
    for i in range(6):
        course_level.append([])

    with open("./courseData.json", "r", encoding="utf-8") as f:
        content = json.load(f)
        for course in content:
            course_level[course["term"]-1].append(course["name"])
            item = {course["name"]: (len(courseinTerm[course["term"]-1]), course["term"])}
            courseinTerm[course["term"]-1].append(item)

    pos = {}
    position = pos.copy()
    for term in courseinTerm:
        volum = {}
        mmerged_dict = volum.copy()
        for item in term:
            mmerged_dict.update(item)
        position.update(mmerged_dict)

    label_list = [] # 课程节点名称
    value_list = [] # 课程坐标
    for key, value in position.items():
        label_list.append(key)
        value_list.append(value)

    label_index = []
    for i in label_list:
        label_index.append(i.split(":")[0])

    # 获取每个课程的前驱课程

    pre_node = []
    for i in range(len(label_list)):
        pre_node.append([])

    for course in content:
        for item in course['pre_course']:
            pre_node[label_list.index(course['name'])].append(label_list.index(item))

    kong = []

    follower_topology = {}.copy()
    for i in range(len(label_list)):
        kong.append({i:pre_node[i]})

    for thing in kong:
        follower_topology.update(thing)

    kong = []

    pos = {}.copy()
    for i in range(len(label_list)):
        kong.append({i:value_list[i]})
    for thing in kong:
        pos.update(thing)

    num_followers = 38

    # Create the communication topology matrix
    communication_topology = np.zeros((num_followers, num_followers))
    for i in range(num_followers):
        neighbors = follower_topology[i]
        for neighbor in neighbors:
            communication_topology[i, neighbor] = 1

    G = nx.Graph()
    G.add_nodes_from(range(num_followers))

    for i in range(num_followers):
        neighbors = follower_topology[i]
        for neighbor in neighbors:
            G.add_edge(i, neighbor)

    labels = {i: f"{label_index[i]}" for i in range(len(label_list))}
    leader_nodes = []
    follower_nodes = []
    for node in G.nodes:
        if node < 6:  # Assuming first 6 nodes are leaders
            leader_nodes.append(node)
        else:
            follower_nodes.append(node)
    plt.figure(figsize=(6, 4))
    plt.figure(dpi=300)
    nx.spring_layout(G, scale=10)
    nx.draw_networkx_nodes(G, pos, nodelist=leader_nodes, node_color='g', node_size=500)
    nx.draw_networkx_nodes(G, pos, nodelist=follower_nodes, node_color='g', node_size=500)
    nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5)
    nx.draw_networkx_labels(G, pos, labels, font_size=10, font_weight='bold')
    plt.rcParams['font.sans-serif'] = ['FangSong']
    plt.title("课程拓扑图")
    plt.axis('off')
    plt.savefig(r'C:\Users\86152\Desktop\大三上课件资料\数据结构课设\changepage\src\page\showGraph\img\makeGraph.png')
    # plt.show()
