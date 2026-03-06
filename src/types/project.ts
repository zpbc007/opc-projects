export interface Project {
  id: number;
  name: string;
  description: string;
  insight: string;
  rating?: number;
  created_at: string;
  // Score fields
  product_score?: number;
  dev_score?: number;
  marketing_score?: number;
  ops_score?: number;
  optimist_score?: number;
  pessimist_score?: number;
  final_score?: number;
  // Brief fields
  product_brief?: string;
  dev_brief?: string;
  marketing_brief?: string;
  ops_brief?: string;
  optimist_brief?: string;
  pessimist_brief?: string;
  scored_at?: string;
}