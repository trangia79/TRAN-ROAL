import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
   Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Survey {
  id: string;
  rating: string;
  comment: string;
  createdAt?: Timestamp;
}

export const listenSurveys = (
  callback: (data: Survey[]) => void
) => {
  // Tạo truy vấn lấy 10 khảo sát mới nhất
  const q = query(
    collection(db, "surveys"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  // Lắng nghe dữ liệu theo thời gian thực
  return onSnapshot(q, (snapshot) => {
    const surveys = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Survey[];

    callback(surveys);
  });
};