# Entity Relationship Diagram - SIAP Database

```mermaid
erDiagram
    USERS {
        int id PK
        string username
        string password
        string email
        string role
        datetime created_at
        datetime updated_at
    }
    
    TEACHERS {
        int id PK
        int user_id FK
        string teacher_id
        string full_name
        string gender
        string place_of_birth
        date date_of_birth
        string religion
        string education
        string npwp
        string phone
        string address
        string photo
        datetime created_at
        datetime updated_at
    }
    
    STUDENTS {
        int id PK
        string student_id
        string full_name
        string gender
        string place_of_birth
        date date_of_birth
        string religion
        string class
        string parent_name
        string parent_phone
        string address
        string photo
        datetime created_at
        datetime updated_at
    }
    
    STUDENT_DOCUMENTS {
        int id PK
        int student_id FK
        string document_type
        string file_path
        string file_name
        datetime uploaded_at
    }
    
    ADMINISTRATIVE_DOCUMENTS {
        int id PK
        string document_type
        string title
        string description
        string file_path
        string file_name
        string status
        datetime document_date
        datetime created_at
        datetime updated_at
    }
    
    MEETING_MINUTES {
        int id PK
        string meeting_title
        date meeting_date
        string participants
        text agenda
        text minutes
        string file_path
        string file_name
        datetime created_at
        datetime updated_at
    }
    
    USERS ||--o{ TEACHERS : has
    STUDENTS ||--o{ STUDENT_DOCUMENTS : has