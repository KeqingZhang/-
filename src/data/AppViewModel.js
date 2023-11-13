import { makeObservable, observable, makeAutoObservable } from "mobx";
export class AppViewModel {
    currentSelectedTerm = -1;

    currentTermCoures = [];
    allCourses = [];

    currentSelectedTermCourses() {
        // console.log(this.currentTermCoures);
        return this.currentTermCoures;
    }
    selectCurrentTerm(number) {
        this.currentSelectedTerm = number;
        // console.log("点啦点了", this.currentSelectedTerm);
        return;
    }

    *fetchCourseData() {
        const response = yield fetch(
            "http://localhost:3005/api/scanResCourse",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const temp = yield response.json();
        let tempList = [];
        temp.map((item) => {
            // console.log(this.currentSelectedTerm + 1);
            if (item["term"] === this.currentSelectedTerm + 1) {
                // console.log(typeof item);
                const tempOb = item;
                tempList.push(tempOb);
                // console.log(tempList);
            }
        });
        this.currentTermCoures = tempList;
        // console.log("本学期中剩余的课程:", this.currentTermCoures);
        setTimeout(this.setCourseData, 100);
    }

    *fetchCourseChange(changerequest) {
        const response = yield fetch("http://localhost:3007/api/changeCourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([changerequest, this.currentSelectedTerm]),
        });
        const result = yield response.json();
        // console.log(result);
        return result;
    }

    constructor() {
        makeAutoObservable(this);
        this.fetchCourseData();
    }
}

const _appViewModel = new AppViewModel();
window["appViewModel"] = _appViewModel;
export const appViewModel = _appViewModel;
