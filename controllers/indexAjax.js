//khai báo svService tương tác api
var svService = new SinhVienService();

//giao tiếp với api thông qua axios
var getApiSinhVien = function() {
    var objectAPI = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',//đường dẫn đi đến file hoặc link backend cung cấp
        method: 'GET' //phương thức backend cung cấp
    }
    
    //gửi yêu cầu duex liệu đến backend => backend trả về promise
    var promise = axios(objectAPI);
    
    //xử lí thành công 
    var funcSuccess = function (result) {
        //gọi ajax thành công thì render table 
        renderTableSinhVien(result.data)
    }
    // xử lí thất bại
    var funcFail = function (error) {
        console.log(error);
    }
    // then(): hàm nhận vào giá trị là 1 hàm xử lí thành công 
    // catch(): hàm nhận vào giá trị là 1 hàm xử lí thất bại
    promise.then(funcSuccess).catch(funcFail);
}
getApiSinhVien();

//lưu ý: ajax là 1 kĩ thuật xử lí bất đồng bộ

var renderTableSinhVien = function (mangSinhVien) {
    var contentTable = '';
    //sau khi lấy được data từ backend => tạo bảng giao diện
    for (var i = 0; i < mangSinhVien.length; i++) {
        //lấy ra từng sinh viên trong dữ liệu backend trả về 
        var sinhVien = mangSinhVien[i];
        //tạo rs 1 sv object từ prototype snh viên
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 9;
        contentTable += `
            <tr> 
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                 <td>${sv.diemTrungBinh()}</td>
                 <td>${sv.xepLoai()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                <button class="btn btn-primary" onclick="chinhSuaSinhVien('${sv.maSV}')"> Chỉnh sửa </button>
                <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')"> Xóa </button></td>
            </tr>
        `
    }
    //dom đến giao diện ghi thông tin dữ liệu 
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}

//CHỈNH SỬA SINH VIÊN 
var chinhSuaSinhVien = function(maSV) {
    var promise = svService.layThongTinSinhVien(maSV);
    promise.then(function(result) {
        // console.log(result.data)
        var sinhVienEdit = result.data;
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.TenSV;
        document.getElementById('email').value = sinhVienEdit.Email;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;
        //khóa mã lại không cho người dùng chỉnh sửa 
        document.getElementById('maSinhVien').disabled = true;
        document.getElementById('btnThemSinhVien').disabled = true;
    }).catch(function(error){
        console.log(error);
    })
}

//Lưu thông tin sinh viên
document.getElementById('btnLuuSinhVien').onclick = function() {
    //lấy thông tin sinh viên gán vào data gửi lên api 
    var sinhVienCapNhat = {
        "MaSV": document.getElementById('maSinhVien').value,
        "HoTen": document.getElementById('tenSinhVien').value,
        "Email": document.getElementById('email').value,
        "SoDT": 123456789,
        "CMND": 123456789,
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value,
    }
    //gọi service cập nhật dữ liệu server
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result) {
        console.log(result.data);
        //load lại table
        getApiSinhVien();
        //mở khóa nút thêm sinh viên
        document.getElementById('btnThemSinhVien').disabled = true;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;
    }).catch(function(error){
        console.log(error);
    })
    console.log(sinhVienCapNhat);
}

//THÊM DỮ LIỆU LÊN SERVER QUA API POST

document.getElementById('btnThemSinhVien').onclick = function () {
    //lấy thông tin từ người dùng gán vào data backkend yêu cầu => data phải chuẩn định dạng backend yêu cầu
    var objectData = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 123456789,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value
    }
    console.log(objectData);
    //dùng axios gọi ajax đưa dữ liệu lên backend xử lí
    var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: objectData //thuộc tính backend yêu cầu dữ liệu gửi di phải đúng định dạng
    }

    var promise = axios(objectAxios);
    promise.then(function(result) {
        //thêm thành công gọi lại api lấy danh sách sinh viên mới về
        getApiSinhVien();
        console.log(result.data);
    }).catch(function(error) {
        console.log(error);
    })

}


//XOÁ SINH VIÊN QUA API 
var xoaSinhVien = function(maSV) {
    //dùng service gọi api xóa
    var promise = svService.xoaSinhVien(maSV);
    promise.then(function(result){
        //xóa thành công thì load lại api get LayDanhSachSinhVien
        getApiSinhVien();
        console.log(result.data);
    }).catch(function(error){
        console.log(error);
    })
}