# Usa Node oficial con Alpine (ligero)
FROM node:18-alpine

# Crea y entra al directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# Expone el puerto donde corre NestJS
EXPOSE 3000

# Ejecuta la app
CMD ["node", "dist/main"]