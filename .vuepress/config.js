module.exports = {
    lang: 'zh-CN',
    title: "Heisexingqitian的主页",
    description: "轻便的指南手册",
    /**
     * 导航链接
     */
    themeConfig: {
        nav: [
            { text: "主页", link: "/" },
            { text: "常用指令", link: "/guide1/" },
            { text: "小bug", link: "/guide2/" },
            { text: "指令笔记", link: "/guide3/" },
            { text: "博客", link: "https://blog.hsxqt.cn" },
        ],
        sidebar: {
            '/guide1/': [''],
            '/guide2/': [''],
            '/guide3/': [''],
        },
    },
};
