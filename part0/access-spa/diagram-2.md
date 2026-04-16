```sequenceDiagram
    participant U as Usuario
    participant B as Navegador
    participant S as Servidor

    U->>B: Accede a /exampleapp/spa
    B->>S: GET /exampleapp/spa
    S-->>B: HTML (SPA)

    B->>S: GET /main.css
    S-->>B: CSS

    B->>S: GET /spa.js
    S-->>B: JavaScript (spa.js)

    Note right of B: Se ejecuta spa.js

    B->>S: GET /exampleapp/data.json
    S-->>B: JSON con notas

    B->>B: notes = JSON.parse(response)
    B->>B: redrawNotes()

    B-->>U: Renderiza notas en la página (sin recarga adicional)
```