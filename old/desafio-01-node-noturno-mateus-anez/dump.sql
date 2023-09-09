--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

-- Started on 2023-06-14 21:12:03 -04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 24582)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24588)
-- Name: nota_fiscal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nota_fiscal (
    id integer NOT NULL,
    data timestamp with time zone NOT NULL,
    valor real NOT NULL,
    cnpj_fornecedor text NOT NULL
);


ALTER TABLE public.nota_fiscal OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24587)
-- Name: nota_fiscal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nota_fiscal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nota_fiscal_id_seq OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 215
-- Name: nota_fiscal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nota_fiscal_id_seq OWNED BY public.nota_fiscal.id;


--
-- TOC entry 3222 (class 2604 OID 24591)
-- Name: nota_fiscal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nota_fiscal ALTER COLUMN id SET DEFAULT nextval('public.nota_fiscal_id_seq'::regclass);


--
-- TOC entry 3369 (class 0 OID 24582)
-- Dependencies: 214
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20230615000620-create-table-nota-fiscal.js
\.


--
-- TOC entry 3371 (class 0 OID 24588)
-- Dependencies: 216
-- Data for Name: nota_fiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nota_fiscal (id, data, valor, cnpj_fornecedor) FROM stdin;
1	2000-10-09 21:00:00-03	200	489503
\.


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 215
-- Name: nota_fiscal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nota_fiscal_id_seq', 1, true);


--
-- TOC entry 3224 (class 2606 OID 24586)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3226 (class 2606 OID 24595)
-- Name: nota_fiscal nota_fiscal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nota_fiscal
    ADD CONSTRAINT nota_fiscal_pkey PRIMARY KEY (id);


-- Completed on 2023-06-14 21:12:03 -04

--
-- PostgreSQL database dump complete
--

