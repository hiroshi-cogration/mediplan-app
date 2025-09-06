import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
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

// Firestoreのドキュメントを使いやすい形に変換するヘルパー関数
const fromFirestore = <T extends DocumentData>(snapshot: QueryDocumentSnapshot): T => {
  // FIX: 型アサーションをより厳格な (unknown as T) に変更
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
 * @param template - 使用する術式テンプレート
 * @param planName - ユーザーが入力する計画名
 */
export const createSurgicalPlan = async (
  template: ProcedureTemplate,
  planName: string
): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  // テンプレートのステップを元に、新しい計画のplanDataを作成
  const initialPlanData = template.steps.map(step => ({
    stepNumber: step.stepNumber,
    status: 'pending', // 初期ステータス
    annotations: null,
    modelTransform: null,
  }));

  const docRef = await addDoc(collection(db, 'surgical_plans'), {
    planName,
    ownerId: user.uid,
    templateId: template.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    patientModelPath: null, // 患者モデルは後からアップロード
    planData: initialPlanData,
  });

  return docRef.id; // 作成された手術計画のIDを返す
};