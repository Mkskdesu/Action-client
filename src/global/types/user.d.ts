interface loginResponse {
    successful: boolean,
    data: {
        uuid: string,
        userid: string,
        sync: {
            time: number
            device: string
        },
        user: apiUserData
    }
    sid:string
}

interface apiUserData {
    name: string
    icon: string,
    createdAt: number
    social: {
        follow: Array<string>
        follower: Array<string>
    }
    record: {}
    notification: {
        priority: Array<notification>
        normal: Array<notification>
        untagged: Array<notification>
    }
}