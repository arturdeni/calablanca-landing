# Configuración de Google Sheets para el formulario de contacto

## Lo que necesitas de tu cliente

1. **Acceso a Google Drive** del cliente (o que ellos realicen la configuración)
2. **URL del Google Apps Script** desplegado (te la proporcionarán después de seguir los pasos)

---

## Instrucciones para el cliente

### Paso 1: Crear el Google Sheet

1. Ir a [Google Sheets](https://sheets.google.com) y crear una nueva hoja de cálculo
2. Nombrarla: `Cala Blanca - Leads Contacto`
3. En la primera fila (cabeceras), escribir estas columnas:
   - A1: `Fecha`
   - B1: `Nombre`
   - C1: `Apellido`
   - D1: `Email`
   - E1: `Teléfono`
   - F1: `Acepta Comercial`

### Paso 2: Crear el Google Apps Script

1. En el Google Sheet, ir a **Extensiones > Apps Script**
2. Borrar todo el código existente y pegar el siguiente:

```javascript
// Google Apps Script para recibir datos del formulario de contacto
// Cala Blanca Residences

function doPost(e) {
  try {
    // Obtener el spreadsheet activo
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parsear los datos JSON recibidos
    const data = JSON.parse(e.postData.contents);

    // Formatear la fecha
    const fecha = new Date(data.timestamp);
    const fechaFormateada = Utilities.formatDate(fecha, 'Europe/Madrid', 'dd/MM/yyyy HH:mm:ss');

    // Añadir una nueva fila con los datos
    sheet.appendRow([
      fechaFormateada,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.commercial ? 'Sí' : 'No'
    ]);

    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para probar manualmente
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastName: 'Usuario',
        email: 'test@example.com',
        phone: '+34 600 000 000',
        commercial: true,
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. Guardar el proyecto (Ctrl+S) y darle un nombre como "Cala Blanca Form Handler"

### Paso 3: Desplegar como Web App

1. Hacer clic en **Implementar > Nueva implementación**
2. Hacer clic en el engranaje junto a "Seleccionar tipo" y elegir **Aplicación web**
3. Configurar:
   - **Descripción**: Formulario contacto Cala Blanca
   - **Ejecutar como**: Yo mismo
   - **Quién tiene acceso**: Cualquier persona
4. Hacer clic en **Implementar**
5. Autorizar el script cuando lo solicite (revisar permisos y aceptar)
6. **COPIAR LA URL** que aparece - esta es la URL que necesitas

### Paso 4: Probar el script

1. Volver al editor de Apps Script
2. Seleccionar la función `testDoPost` en el desplegable
3. Hacer clic en **Ejecutar**
4. Verificar que aparece una nueva fila en el Google Sheet

---

## Configuración en el código

Una vez tengas la URL del Google Apps Script, edita el archivo:

`src/components/Timeline.astro`

Busca esta línea (aproximadamente línea 895):

```javascript
const GOOGLE_SCRIPT_URL = 'PENDING_GOOGLE_APPS_SCRIPT_URL';
```

Y reemplázala con la URL proporcionada:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXX/exec';
```

---

## Notas importantes

- La URL del script **no debe compartirse públicamente** ya que permite escribir en el spreadsheet
- Si se necesita actualizar el script, hay que crear una **nueva implementación** para que los cambios surtan efecto
- Los datos se añaden en tiempo real al Google Sheet
- El campo "Acepta Comercial" indica si el usuario aceptó recibir información comercial

## Estructura de datos enviados

```json
{
  "firstName": "Nombre del usuario",
  "lastName": "Apellido del usuario",
  "email": "email@ejemplo.com",
  "phone": "+34 600 000 000",
  "commercial": true/false,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```
