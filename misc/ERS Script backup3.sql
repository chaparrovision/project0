drop table if exists reimbursements;
drop table if exists reimbursementType;
drop table if exists reimbursementStatus;
drop table if exists users;
drop table if exists roles;


create table roles (
	roleId serial primary key,
  	role varchar(30)
);

insert into roles (role) values ('admin'), ('finance-manager'), ('user');


select * from roles;

create table users (
	userId serial primary key,
	username varchar(40) not null unique,
	password varchar(40) not null,
	firstname varchar(40) not null,
	lastname varchar(40) not null,
	email varchar(40) not null,
	role integer references roles (roleId)
);

insert into users (username, password, firstName, lastName, email, role) 
	insert into users (username, password, firstName, lastName, email, role) 
	values ('jonJon', '1234', 'Jon', 'Jons', 'jon@yahoo.com', 1),
		('dylanDylan', '5678', 'Dylan', 'Dylans', 'dylan@yahoo.com', 2),
		('samSam', '9876', 'Sam', 'Sams', 'sam@yahoo.com', 3);

select * from users;


create table reimbursementStatus (
	statusId serial primary key,
  	status varchar(30) not null unique
);

insert into reimbursementstatus (status) values ('pending'), ('approved'),('denied');
--insert into reimbursementstatus (status) values ('approved'),
--insert into reimbursementstatus (status) values ('denied')

select * from reimbursementStatus;

create table reimbursementType (
	typeId serial primary key,
  	type varchar(30) not null unique
);
insert into reimbursementType (type) values ('Lodging'),('Travel'),('Food'),('Other');

select * from reimbursementType;

create table reimbursements (
	reimbursementId serial primary key,
	author Integer references users(userId),
	amount integer not null,
	dateSubmitted integer not null,
	dateResolved integer,
	description varchar(40) not null,
	resolver integer references users(userId),
	status integer references reimbursementStatus(statusId),
	type integer references reimbursementtype(typeId)		
);

insert into reimbursements (amount, datesubmitted, dateresolved, description, resolver, status, "type")
	values (1234, 01012010, null, 'pending', 1, 2, 3);

select * from reimbursements;

