import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import Collapse from "@material-ui/core/Collapse";

import TierGraph from "./TierGraph";
import { topologyLevelAdvanced, maxSubLen, genIdMapGraph } from "./algorithm";

const useStyles = makeStyles((theme) => ({
    form: {
        "& > div > *": {
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
    },
    btns: {
        "& > *": {
            border: 0,
            borderRadius: 3,
            color: "white",
        },
        display: "flex",
    },
    exec: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    undo: {
        background: "rgb(76, 175, 80)",
        "&:hover": {
            background: "rgb(86, 185, 90)",
        },
        boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
    },
    reset: {
        background: "rgb(236, 64, 122)",
        "&:hover": {
            background: "rgb(246, 74, 132)",
        },
        boxShadow: "0 3px 5px 2px rgba(236, 64, 122, .3)",
        marginLeft: theme.spacing(2),
    },
    error: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },

    highlightFixed: {
        "&:hover": {
            backgroundColor: "#81D4FA",
        },
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "#B3E5FC",
    },
    highlightError: {
        "&:hover": {
            backgroundColor: "#e57373",
        },
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "#ef9a9a",
    },
}));

function ErrorAlert(props) {
    return (
        <Collapse in={Boolean(props.error)}>
            <Alert severity="error" {...props}>
                <AlertTitle>培养计划无法完成</AlertTitle>
                {props.error &&
                    props.error.split("\n").map((line, i) => (
                        <span key={i}>
                            {line} <br />
                        </span>
                    ))}
            </Alert>
        </Collapse>
    );
}
const PlanPage = React.memo((props) => {
    const classes = useStyles();
    const {
        classList,
        fixedClasses,
        setFixedClasses,
        resultState,
        setResultState,
    } = props;

    const defaultPlanConfig = {
        semester: 8,
        period: 280,
    };
    const [planConfig, setPlanConfig] = useState(defaultPlanConfig);
    const [lastFixedClasses, setLastFixedClasses] = useState(fixedClasses);

    const handlePlanConfigChange = (prop) => {
        return (event) => {
            let newValue = parseInt(event.target.value);
            setPlanConfig((oldConfig) => {
                let fclasses = { ...fixedClasses };
                if (prop === "semester") {
                    for (const fixedClass in fclasses) {
                        if (fclasses.hasOwnProperty(fixedClass)) {
                            if (fclasses[fixedClass] > newValue - 1)
                                fclasses[fixedClass] = newValue - 1;
                        }
                    }
                    setFixedClasses(fclasses);
                }
                let newConfig = { ...oldConfig, [prop]: newValue };
                setResultState(
                    topologyLevelAdvanced(
                        classList,
                        fclasses,
                        newConfig.semester,
                        newConfig.period,
                    ),
                );

                return newConfig;
            });
        };
    };

    let classMap = {};
    for (const classItem of classList) {
        classMap[classItem.id] = classItem;
    }

    return (
        <Box>
            <Typography variant="h2" component="h1" paragraph>
                计划设置
            </Typography>
            <Box className={classes.form}>
                <div>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="plan-total-semester">
                            总学期数
                        </InputLabel>
                        <OutlinedInput
                            id="plan-total-semester"
                            type="number"
                            defaultValue={defaultPlanConfig.semester}
                            onChange={handlePlanConfigChange("semester")}
                            endAdornment={
                                <InputAdornment position="end">
                                    学期
                                </InputAdornment>
                            }
                            labelWidth={65}
                            inputProps={{ min: 1, max: 36 }}
                            style={{ width: "240px" }}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="plan-total-period">
                            每学期最大排课学时数
                        </InputLabel>
                        <OutlinedInput
                            id="plan-total-period"
                            type="number"
                            defaultValue={defaultPlanConfig.period}
                            onChange={handlePlanConfigChange("period")}
                            endAdornment={
                                <InputAdornment position="end">
                                    学时
                                </InputAdornment>
                            }
                            labelWidth={165}
                            inputProps={{ step: 10, min: 30, max: 2520 }}
                            style={{ width: "240px" }}
                        />
                    </FormControl>
                </div>
            </Box>
            <Typography variant="caption" paragraph>
                参考设置为：8学期（4学年），每学期最多排课280学时。
            </Typography>

            <Typography variant="h2" component="h1" paragraph>
                计划生成
            </Typography>
            <Box className={classes.btns} mb={1}>
                <Button
                    variant="contained"
                    className={classes.exec}
                    onClick={() => {
                        setResultState(
                            topologyLevelAdvanced(
                                classList,
                                fixedClasses,
                                planConfig.semester,
                                planConfig.period,
                            ),
                        );
                    }}
                >
                    开始渐进式排课算法
                </Button>
                <Box
                    mx={2}
                    component="span"
                    style={{ borderLeft: "solid 2px #ccc" }}
                />
                <Button
                    variant="contained"
                    className={classes.undo}
                    disabled={fixedClasses === lastFixedClasses}
                    onClick={() => {
                        setFixedClasses(lastFixedClasses);
                        setResultState(
                            topologyLevelAdvanced(
                                classList,
                                lastFixedClasses,
                                planConfig.semester,
                                planConfig.period,
                            ),
                        );
                    }}
                >
                    撤销
                </Button>
                <Button
                    variant="contained"
                    className={classes.reset}
                    disabled={Object.keys(fixedClasses).length === 0}
                    onClick={() => {
                        setLastFixedClasses(fixedClasses);
                        setFixedClasses({});
                        setResultState(
                            topologyLevelAdvanced(
                                classList,
                                {},
                                planConfig.semester,
                                planConfig.period,
                            ),
                        );
                    }}
                >
                    重置固定课程
                </Button>
            </Box>
            <ErrorAlert className={classes.error} error={resultState.error} />

            <Typography variant="caption" paragraph>
                拖动课程以进行人工辅助排课，若出现冲突，可以通过上方的按钮进行撤销和重置。
            </Typography>
            <TierGraph
                tiers={resultState.levels.length}
                itemsListMap={(function () {
                    let graphMap = genIdMapGraph(classList);
                    return resultState.levels.map((s) =>
                        s.map((classItem) => graphMap[classItem.id]),
                    );
                })()}
                itemRender={(id) => (
                    <>
                        {classMap[id].name}
                        <br />
                        <small> {classMap[id].period} 学时 </small>
                        <br />
                        {id in fixedClasses && (
                            <small>
                                <Link
                                    component="button"
                                    style={{ fontSize: "small" }}
                                    variant="body2"
                                    onClick={() => {
                                        setLastFixedClasses(fixedClasses);
                                        let newFixedClasses = {
                                            ...fixedClasses,
                                        };
                                        delete newFixedClasses[id];
                                        setFixedClasses(newFixedClasses);
                                        setResultState(
                                            topologyLevelAdvanced(
                                                classList,
                                                newFixedClasses,
                                                planConfig.semester,
                                                planConfig.period,
                                            ),
                                        );
                                    }}
                                >
                                    <ShuffleIcon
                                        style={{
                                            verticalAlign: "middle",
                                            fontSize: "small",
                                        }}
                                    />
                                    <small style={{ verticalAlign: "middle" }}>
                                        取消固定
                                    </small>
                                </Link>
                            </small>
                        )}
                    </>
                )}
                itemContainerClassName={(id) =>
                    id in resultState.errorList
                        ? classes.highlightError
                        : id in fixedClasses
                        ? classes.highlightFixed
                        : ""
                }
                movedCallback={(id, target) => {
                    setLastFixedClasses(fixedClasses);
                    let newFixedClasses = { ...fixedClasses, [id]: target };
                    setFixedClasses(newFixedClasses);
                    setResultState(
                        topologyLevelAdvanced(
                            classList,
                            newFixedClasses,
                            planConfig.semester,
                            planConfig.period,
                        ),
                    );
                    // console.log(id, 'to', target);
                }}
            />
            <br />

            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="classes session table"
                >
                    <TableHead>
                        <TableRow>
                            {[...resultState.levels.keys()].map((i) => (
                                <TableCell key={i}>第{i + 1}学期</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(maxSubLen(resultState.levels)).keys()].map(
                            (row_i) => (
                                <TableRow key={row_i}>
                                    {[...resultState.levels.keys()].map(
                                        (col_i) => (
                                            <TableCell
                                                key={col_i}
                                                style={
                                                    resultState.error && {
                                                        color: "#888",
                                                    }
                                                }
                                            >
                                                {row_i <
                                                    resultState.levels[col_i]
                                                        .length &&
                                                    resultState.levels[col_i][
                                                        row_i
                                                    ].name}
                                                <br />
                                                <small>
                                                    {row_i <
                                                        resultState.levels[
                                                            col_i
                                                        ].length &&
                                                        resultState.levels[
                                                            col_i
                                                        ][row_i].period +
                                                            "学时"}
                                                </small>
                                            </TableCell>
                                        ),
                                    )}
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
});

export default PlanPage;
