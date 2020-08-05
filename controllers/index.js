//mangSinhVien :chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new validation();




document.getElementById('btnThemSinhVien').onclick = function() {
    // lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    // sinhVien.diemTrungBinh = sinhVien.diemTrungBinh();
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    console.log(sinhVien);

    //kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng 
    //kiểm tra rỗng
    var valid = validate.kiemTraRong(sinhVien.maSV,'#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV,'#error_tenSinhVien') & validate.kiemTraRong(sinhVien.email,'#error_email') & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy') & validate.kiemTraRong(sinhVien.diemHoa, '#error_diemHoa') & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_diemRenLuyen');
    //trim(): phương thức loại bỏ khoảng trống đầu và cuối của chuỗi
    // if(sinhVien.maSV.trim() == '') {
    //     //dom đến thẻ thông báo dưới thẻ input#maSV (display block và ghi lỗi)
    //     document.getElementById('error_maSinhVien').style.display = 'block';
    //     document.getElementById('error_maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống!';
    //     valid = false;
    // }else { //trường hợp người dùng hợp lệ (display none, gắn lỗi bằng rỗng)
    //     document.getElementById('error_maSinhVien').innerHTML = '';
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    // }

    // if(sinhVien.tenSV.trim() == '') {
    //     document.getElementById('error_tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_tenSinhVien').innerHTML = '';
    //     document.getElementById('error_tenSinhVien').style.display = 'none';
    // }

    // kiểm tra tên là kí tự 
    
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error_all_letter_tenSinhVien');
    //kiểm tra email
    valid &= validate.kiemTraEmail(sinhVien.email, '#error_all_email');
    //kiểm tra điểm toán lý hóa
    valid &= validate.kiemTraDiem(sinhVien.diemToan, '#error_all_diemToan') & validate.kiemTraDiem(sinhVien.diemLy, '#error_all_diemLy') & validate.kiemTraDiem(sinhVien.diemHoa,'#error_all_diemHoa') & validate.kiemTraDiem(sinhVien.diemRenLuyen,'#error_all_diemRenLuyen');
    //kiểm tra giá trị 
    valid &= validate.kiemTraGiaTri(sinhVien.diemToan,'#error_min_max_value_diemToan',0,10) & validate.kiemTraGiaTri(sinhVien.diemLy,'#error_min_max_value_diemLy',0,10) & validate.kiemTraGiaTri(sinhVien.diemHoa,'#error_min_max_value_diemHoa',0,10) & validate.kiemTraGiaTri(sinhVien.diemRenLuyen,'#error_min_max_value_diemRenLuyen',0,10);
    //kiểm tra độ dài 
    // valid &= validate.kiemTraDoDaiChuoi(sinhVien.maSV,'#error_min_max_length_maSinhVien', 4,6);

    if(!valid) { //nếu như valid === false => không hợp lệ
        return;
    }

    

    
    // var regexAllLetter = /^[A-Z a-z]+$/;
    // if(!regexAllLetter.test(sinhVien.tenSV)){
    //     document.getElementById('error_all_letter_tenSinhVien').style.display = 'block';
    //     document.getElementById('error_all_letter_tenSinhVien').innerHTML = 'Tên sinh viên không hợp lệ.';
    //     valid = false;
    // } else {
    //     document.getElementById('error_all_letter_tenSinhVien').innerHTML = '';
    //     // document.getElementById('error_all_letter_tenSinhVien').style.display = 'none';
    // }

    //push(): phương thức thêm 1 phần tử vào mangSinhVien
    mangSinhVien.push(sinhVien);
    console.log(mangSinhVien)
    renderTableSinhVien(mangSinhVien);

      luuLocalStorage();

    // //tạo nội dung thẻ tr sinh viên 
    // var trSinhVien = document.createElement('tr');
    // // tạo nội dung các thẻ td
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSV = document.createElement('td');
    // tdLoaiSV.innerHTML = sinhVien.loaiSV;

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.diemTrungBinh();

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // //thêm một trường td dành cho button xóa
    // var tdAction = document.createElement('td');

    // var btnXoa = document.createElement('button');
    // btnXoa.innerHTML = 'Xóa';
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.id = 'btnXoa';
    // btnXoa.onclick = function() {
    //     //tìm ra phần tử cha (td) => từ td tìm ra tr xóa
    //     btnXoa.parentElement.parentElement.remove();
    // }

    // tdAction.appendChild(btnXoa);

    // //đưa các thẻ td vào thẻ tr
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSV);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);

    // //dom đến thẻ tbody appendChild(tr)
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);

}


var renderTableSinhVien = function(mangSV) {
    // từ dữ liệu mảng tạo ra các thẻ tr tương ứng 
    var chuoiTr = '';
    for(var index = 0; index < mangSV.length; index++) {
        // mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên trong mảng 
        var sinhVien = mangSV[index];
        //tạo object mới lất dữ liệu từ mangSV[i] gán qua
        var sv = new SinhVien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemToan = sinhVien.diemToan;
        sv.diemLy = sinhVien.diemLy;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        
        // từ dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng
        chuoiTr += `
            <tr> 
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                 <td>${sv.diemTrungBinh()}</td>
                 <td>${sv.xepLoai()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-dnager" onclick="xoaSinhVien('${sv.maSV}')"> Xóa </button></td>
            </tr>
        `
    }
    //thoát ra vòng lặp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

var xoaSinhVien = function(maSV) {
    //từ mã sinh viên sẽ tìm ra thằng sinhViên cần xóa
    for(var index=0; index < mangSinhVien.length; index++) {
        //mỗi lần duyệt lấy ra 1 sinhVien
        var sinhVien = mangSinhVien[index];
        if(sinhVien.maSV === maSV) // nếu sinhVien trong mảng có mã = maSinhVien được click
        {
            // tại vị trí đó mình sẽ xóa phần đó đi 
            mangSinhVien.splice(index,1);
        }
    }
    //(var index=mangSinhVien.length; index >=0 ; index--) 
    //sau kkhi xóa xong tạo lại tableSinhVien
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
    console.log(mangSinhVien);
}


var luuLocalStorage = function() {
    //biến mangSinhVien => chuỗi
    var smangSinhVien = JSON.stringify(mangSinhVien);
    //lưu vào localstorage
    localStorage.setItem('mangSinhVien',smangSinhVien);
}

var layDuLieuLocalStorage = function() {
    if(localStorage.getItem('mangSinhVien')){
        //lấy dữ liệu từ localstorage
        var smangSinhVien = localStorage.getItem('mangSinhVien');
        //chuyển chuỗi localstorage về mảng (object) và gắn cho mangSinhVien
        mangSinhVien = JSON.parse(smangSinhVien);
        //gọi hàm render mangSinhVien => render lại table
        renderTableSinhVien(mangSinhVien);
        // console.log(smangSinhVien);
    }
}
layDuLieuLocalStorage();


console.log(axios);