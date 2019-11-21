const generateId = (arr) => {
    let id = 0;
    if (arr[arr.length - 1]) {
        
        id = arr[arr.length - 1].id + 1;
        check();
        function check() {
            arr.forEach(element => {
                if (element.id >= 200) {
                    return
                }
                if (id === element.id) {
                    id++;
                    check();
                }
            });
        }
    } else {
        id = 1;
    }
    return id;
}
export default generateId;