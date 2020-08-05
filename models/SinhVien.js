var SinhVien = function (maSV, tenSV, diemToan, diemLy, diemHoa, diemRenLuyen, loaiSV, email) {
    this.maSV = maSV;
    this.tenSV = tenSV;
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
    this.diemRenLuyen = diemRenLuyen;
    this.loaiSV = loaiSV;
    this.email = email;
    this.diemTrungBinh = function () {
        
        // this đại diện cho đối tượng sinh viên (chứa 7 thuộc tính maSV, tenSV,...)
        return (Number(this.diemHoa) + Number(this.diemLy) + Number(this.diemToan)) / 3;
    },
        this.xepLoai = function () {
            var diemTrungBinh = this.diemTrungBinh();
            if (this.diemRenLuyen < 5) {
                return 'Yếu';
            } else if (this.diemRenLuyen >= 5) {
                if (diemTrungBinh < 5) {
                    return 'Yếu';
                } else if (diemTrungBinh >= 5 && diemTrungBinh < 6.5) {
                    return 'Trung bình khá!';
                } else if (diemTrungBinh >= 6.5 && diemTrungBinh < 8) {
                    return 'Khá';
                } else if (diemTrungBinh >= 8 && diemTrungBinh < 9) {
                    return 'Giỏi';
                } else {
                    return 'Điểm trung bình không hợp lệ!';
                }
            } else {
                return 'Điểm rèn luyện không hợp lệ!';
            }
        }
}