drop table if exists tb_heros;

create table tb_heros (
    id int genereted always as identity primary key not null,
    name text not null,
    power text not null
);

insert into tb_heros (name, power) 
values 
    ('Flash', 'Speed'),
    ('Aquaman', 'Ocean'),
    ('Batman', 'Money')