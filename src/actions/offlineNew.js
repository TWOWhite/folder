// 查询数据
export function searchByCondition() {
    const reulst = [];
    for (let i = 0; i < 20; i++) {
        reulst.push({
            date: '2017-12-28 13:07',
            id: `20170228${i}`,
            md5: '7894564564adfadfa1456adfdaf',
            type: 'pc',
            method: {
                id: '2017122803',
                type: 'pc',
            }
        });
    }
    this.path('offline', 'new', 'list').set(reulst);
    this.commit();
}
// 展示发布弹窗
export function showReleaseModal(index) {
    this.goto('offline', 'new');
    const item = this.get('list', index);
    this.goto('offline', 'new', 'releaseModal');
    this.path('show').set(true);
    this.path('item').set(item);
    this.commit();
}
// 修改发布设置属性
export function changeReleaseModalConfig(key, value) {
    this.goto('offline', 'new', 'releaseModal', 'config');
    this.path(key).set(value);
    this.commit();
}
// 隐藏发布弹窗
export function hideReleaseModal() {
    this.goto('offline', 'new');
    this.path('releaseModal').set({
        show: false,
        item: {},
        config: {
            scope: 'all',
            grayText: '21299'
        }
    });
    this.commit();
}

