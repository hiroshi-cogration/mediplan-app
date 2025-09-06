import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
  doc, // NEW: インポートを追加
  getDoc, // NEW: インポートを追加
} from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

// 術式テンプレートの型定義
export interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
  defaultModelPath: string;
}

export interface ProcedureTemplate extends DocumentData {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: ProcedureStep[];
}

// NEW: 手術計画の型定義
export interface SurgicalPlan extends DocumentData {
  id: string;
  planName: string;
  ownerId: string;
  templateId: string;
  // createdAt, updatedAt は serverTimestamp のため、クライアント側では Date | null として扱うのが一般的
  createdAt: any; 
  updatedAt: any;
  patientModelPath: string | null;
  planData: any[]; // planDataの具体的な型は後で定義
}


// Firestoreのドキュメントを使いやすい形に変換するヘルパー関数
const fromFirestore = <T extends DocumentData>(snapshot: QueryDocumentSnapshot): T => {
  return { id: snapshot.id, ...snapshot.data() } as unknown as T;
};

/**
 * 全ての術式テンプレートを取得する
 */
export const getProcedureTemplates = async (): Promise<ProcedureTemplate[]> => {
  const querySnapshot = await getDocs(collection(db, 'procedure_templates'));
  return querySnapshot.docs.map(doc => fromFirestore<ProcedureTemplate>(doc));
};

/**
 * 新しい手術計画を作成する
 */
export const createSurgicalPlan = async (
  template: ProcedureTemplate,
  planName: string
): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User is not authenticated.');
  const initialPlanData = template.steps.map(step => ({
    stepNumber: step.stepNumber,
    status: 'pending',
    annotations: null,

    modelTransform: null,
  }));
  const docRef = await addDoc(collection(db, 'surgical_plans'), {
    planName,
    ownerId: user.uid,
    templateId: template.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    patientModelPath: null,
    planData: initialPlanData,
  });
  return docRef.id;
};


// NEW: IDに基づいて単一の手術計画を取得する
export const getSurgicalPlan = async (planId: string): Promise<SurgicalPlan | null> => {
  const docRef = doc(db, 'surgical_plans', planId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // ドキュメントデータをSurgicalPlan型にキャスト
    return { id: docSnap.id, ...docSnap.data() } as SurgicalPlan;
  } else {
    console.error("No such document!");
    return null;
  }
};