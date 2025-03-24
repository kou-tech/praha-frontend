## ドキュメント
1. 認証は、Supabaseの標準の認証機能（auth.users）と連携し、自前でユーザーテーブルも作成して、プロフィール情報を管理する。
2. テーブルはuserテーブルとattendanceテーブルのみで定義する。
3. 勤務状態は前回のアクションに関連するとする。
- 出勤 (前回が退勤、あるいはレコードがない)
- 休憩開始 (前回が出勤)
- 休憩終了 (前回が休憩開始)
- 退勤(前回が出勤または休憩終了)

## テーブル定義
```mermaid
erDiagram
    %% テーブル定義
    user_profile {
        uuid id "Supabaseのauth.users.idと紐づく"
        text first_name "名"
        text last_name "姓"
        timestamp created_at "default: now()"
        timestamp updated_at "default: now()"
    }

    attendance {
        uuid attendance_id PK "勤怠アクションID"
        uuid user_profile_id FK "user_profile.user_profile_idと紐づく"
        text action "出勤/休憩開始/休憩終了/退勤"
        timestamp timestamp "アクション発生日（default: now()）"
        timestamp created_at "default: now()"
        timestamp updated_at "default: now()"
    }

    %% リレーション
    user_profile ||--|{ attendance : "1対多(ユーザーは複数の勤怠レコードを持つ)"

```

## トリガー定義

```sql
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user_profile (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```


## エラー内容

```txt
Error [AuthApiError]: Email not confirmed
```
