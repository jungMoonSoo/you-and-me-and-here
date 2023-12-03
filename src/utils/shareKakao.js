export const shareKakao = (route, title, contents) => {
    const { Kakao } = window;

    if (Kakao) {
        if (!Kakao.isInitialized()) {
            Kakao.init("00849d974e1f96b13b2553454fecff21");
        }

        Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: title,
                description: contents,
                imageUrl:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4f_XD7nuTxWC-LBxgrn0YVBiHMtzyxZWxFA&usqp=CAU",
                link: {
                    mobileWebUrl: route,
                    webUrl: route,
                },
            },
            buttons: [
                {
                    title: "자세히 보기",
                    link: {
                        mobileWebUrl: route,
                        webUrl: route,
                    },
                },
            ],
        });
    }
};
