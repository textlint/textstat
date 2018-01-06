declare const report: (
    context: any
) => {
    [x: string]: (node: any) => void;
    [x: number]: (node: any) => void;
};
export default report;
