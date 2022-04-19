export const parseTime = function (time) {
    if (time == null) {
        return "--";
    }
    const d = new Date(time);
    const local_time = d.toLocaleString("zh-Hans-CN", { hour12: false });
    return local_time.replace(' 24', ' 00');
}

export const addSelectField = function (obj) {
    obj.selected = false
    return obj
}

export const download = function (url, prefix = process.env.VUE_APP_BASE_API) {
    if (prefix) {
        window.open(`${prefix}/${url}`);
    }
    else {
        window.open(url);
    }
}

export const closeDialog = function (event) {
    this.is_dialog_open = false;
}
export const closeUpdateDialog = function (event) {
    this.is_update_dialog_open = false;
}
export const setIsUpdateDialogOpen = function (val) {
    this.is_update_dialog_open = val;
}

export const convertArray2String = function (accumulator, currentValue) {
    return accumulator + ', ' + currentValue
}

export const openDetailPage = function (task_id) {
    let routeData = this.$router.resolve({ name: "Task Detail", params: { task_id: task_id } });
    window.open(routeData.href, '_blank');
}

export const hasDuplicates = function (array) {
    return (new Set(array)).size !== array.length;
}