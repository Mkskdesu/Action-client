type recordDay = {
    [key in keyof typeof subjectMap]: {
        time: number;
        reflection: string;
    };
};