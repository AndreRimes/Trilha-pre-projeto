DB_URL=postgresql://root:secret@localhost:5433/Todo?sslmode=disable

postgres:
	docker run --name postgres -p 5433:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=root -d postgres:14-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root Todo

dropdb:
	docker exec -it postgres dropdb Todo

.PHONNY: postgres createdb dropdb 
