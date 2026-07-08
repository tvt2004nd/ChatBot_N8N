import ListFile from "./_components/ListFile";
import UploadFile from "./_components/uploadFile";

export default function FilePage() {
  return (
    <div>
      <div>Các file đã tải lên</div>
      <UploadFile />
      <ListFile />
    </div>
  );
}
