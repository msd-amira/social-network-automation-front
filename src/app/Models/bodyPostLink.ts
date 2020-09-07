export class BodyPostLink {
    author: string;
    lifecycleState: string;
    specificContent: {
        ShareContent: {
            shareCommentary: {
                text: string;
            },
            shareMediaCategory: string;
        }
    };
    visibility: {
        MemberNetworkVisibility: string;
    };
    constructor(auth : string, lifecycleState : string, text : string, shareMediaCategory:string, MemberNetworkVisibility:string) {
        this.author = auth;
        this.lifecycleState = lifecycleState;
        this.specificContent["ShareContent"]["shareCommentary"]["text"] = text;
        this.specificContent["ShareContent"]["shareMediaCategory"] = shareMediaCategory;
        this.visibility.MemberNetworkVisibility = MemberNetworkVisibility;
     }
}