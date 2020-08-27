export class bodyPostLink {
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

}