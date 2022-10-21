-- Active: 1665926832520@@127.0.0.1@5432@postgres@public

CREATE EXTENSION 'uuid-ossp';

CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP() 
RETURNS TRIGGER AS $$ 
	BEGIN NEW."updatedAt" = NOW();
	RETURN NEW;
	END $ $ LANGUAGE 
PLPGSQL; 

CREATE TABLE
    "users" (
        "id" VARCHAR(255) default uuid_generate_v4(),
        "email" VARCHAR(255),
        "password" VARCHAR(255),
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "users" add primary key ("id");

DROP TABLE "profile";

CREATE TABLE
    "profile"(
        "id" VARCHAR(255) default uuid_generate_v4(),
        "userId" VARCHAR(255),
        "fullName" VARCHAR(255),
        "picture" VARCHAR(255),
        "birthDate" VARCHAR(255),
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "profile" add primary key ("id");

CREATE TABLE
    "test"(
        "id" VARCHAR(255) default uuid_generate_v4(),
        "code" VARCHAR(255) default random_string(90),
        "userId" VARCHAR(255),
        "email" VARCHAR(255),
        "available" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "test" add primary key ("id");

DROP TABLE "test";

CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "test" for each row
	execute
	    procedure trigger_set_timestamp();


CREATE TABLE
    "forgot_passwords"(
        "id" VARCHAR(255) default uuid_generate_v4(),
        "code" VARCHAR(255) default random_string(100),
        "userId" VARCHAR(255),
        "email" VARCHAR(255),
        "available" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "forgot_passwords" add primary key ("id");

DROP TABLE "forgot_passwords";

CREATE TRIGGER SET_TIMESTAMP 
	before
	update
	    on "forgot_passwords" for each row
	execute
	    procedure trigger_set_timestamp();


CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "users" for each row
	execute
	    procedure trigger_set_timestamp();


CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "profile" for each row
	execute
	    procedure trigger_set_timestamp();

SELECT id,email,password,"createdAt","updatedAt" FROM users;

SELECT
    id,
    code,
    "userId",
    email,
    available,
    "createdAt",
    "updatedAt"
FROM forgot_passwords;

CREATE OR REPLACE FUNCTION RANDOM_STRING(LENGTH INTEGER
) RETURNS TEXT AS $$ 
	declare
	    chars text [] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
	result text := '';
	i integer := 0;
	begin
	    if length < 0 then raise exception 'Given length cannot be less than 0';
	end if;
	for i in 1..length loop result := result || chars [1 + random() * (array_length(chars, 1) -1)];
	end loop;
	return result;
	end;
	$$ language 
PLPGSQL; 
