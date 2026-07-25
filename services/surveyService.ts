import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Survey {
  id: string;
  rating: string;
  comment: string;
  createdAt?: Timestamp;
}

// 📡 Lắng nghe dữ liệu khảo sát theo thời gian thực (10 bài mới nhất)
export const listenSurveys = (
  callback: (data: Survey[]) => void
) => {
  const q = query(
    collection(db, "surveys"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  return onSnapshot(q, (snapshot) => {
    const surveys = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Survey[];

    callback(surveys);
  });
};

// 🗑️ Hàm xóa/reset toàn bộ dữ liệu trong collection "surveys"
export async function resetAllSurveys() {
  try {
    const querySnapshot = await getDocs(collection(db, "surveys"));
    const deletePromises = querySnapshot.docs.map((docItem) =>
      deleteDoc(doc(db, "surveys", docItem.id))
    );
    await Promise.all(deletePromises);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi reset dữ liệu:", error);
    throw error;
  }
}