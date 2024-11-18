--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Debian 13.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.3

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

DO $CREATE_ROLE$
BEGIN
  CREATE ROLE api_user SUPERUSER LOGIN;
  EXCEPTION WHEN DUPLICATE_OBJECT THEN
  RAISE NOTICE 'not creating role my_role -- it already exists';
END
$CREATE_ROLE$;

--
-- Name: api; Type: SCHEMA; Schema: -; Owner: api_user
--

CREATE SCHEMA api;


ALTER SCHEMA api OWNER TO api_user;

--
-- Name: super_api; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA super_api;


ALTER SCHEMA super_api OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: endpoint_options_jsonb; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.endpoint_options_jsonb AS jsonb;


ALTER DOMAIN public.endpoint_options_jsonb OWNER TO postgres;

--
-- Name: auth_account_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.auth_account_id() RETURNS uuid
    LANGUAGE plpgsql
    AS $$
    DECLARE account_id uuid;
    BEGIN
      account_id := (
        SELECT account_api_key.account_id
          FROM super_api.account_api_key
          WHERE key_string=current_setting('request.header.apikey', 't')
      );
      RETURN account_id;
    END
  $$;


ALTER FUNCTION public.auth_account_id() OWNER TO postgres;

--
-- Name: change_last_modified(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.change_last_modified() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      NEW.last_modified_at := current_timestamp;
      RETURN NEW;
    END
    $$;


ALTER FUNCTION public.change_last_modified() OWNER TO postgres;

--
-- Name: create_new_account_api_key(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_new_account_api_key() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      INSERT INTO account_api_key (account_id, purpose) VALUES (NEW.account_id, 'Default');
      RETURN NULL;
    END
    $$;


ALTER FUNCTION public.create_new_account_api_key() OWNER TO postgres;

--
-- Name: meter_limit_checker(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.meter_limit_checker() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF (
        SELECT COUNT(*) FROM meter WHERE meter.account_id = NEW.account_id
      ) >= 1000 THEN
        RAISE EXCEPTION 'You can only have 1,000 meters!';
      END IF;
      RETURN NEW;
    END
    $$;


ALTER FUNCTION public.meter_limit_checker() OWNER TO postgres;

--
-- Name: new_account(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.new_account() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.account_name IS NULL THEN
        NEW.account_name := 'user_' || NEW.account_num;
      END IF;
      RETURN NEW;
    END
    $$;


ALTER FUNCTION public.new_account() OWNER TO postgres;

--
-- Name: new_tree(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.new_tree() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.tree_name IS NULL THEN
        NEW.tree_name := 'Tree ' || NEW.tree_num;
      END IF;
      IF NEW.tree_key IS NULL THEN
        NEW.tree_key := 'tree_' || NEW.tree_num;
      END IF;
      IF NEW.tree_def IS NULL THEN
        NEW.tree_def := '{"New Tree":{"name":"New Tree","description": "What is the first thing you will unlock?"}}';
      END IF;
      RETURN NEW;
    END
    $$;


ALTER FUNCTION public.new_tree() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    account_id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_num integer NOT NULL,
    account_name text NOT NULL,
    email text,
    auth0_id text,
    last_active_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: account; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.account AS
 SELECT account.account_id,
    account.account_num,
    account.account_name,
    account.email,
    account.auth0_id,
    account.last_active_at,
    account.created_at
   FROM public.account;


ALTER TABLE api.account OWNER TO api_user;

--
-- Name: account_api_key; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_api_key (
    account_api_key_id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_id uuid NOT NULL,
    key_string text DEFAULT md5((random())::text) NOT NULL,
    purpose text,
    last_used_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.account_api_key OWNER TO postgres;

--
-- Name: account_api_key; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.account_api_key AS
 SELECT account_api_key.account_api_key_id,
    account_api_key.account_id,
    account_api_key.key_string,
    account_api_key.purpose,
    account_api_key.last_used_at,
    account_api_key.created_at
   FROM public.account_api_key;


ALTER TABLE api.account_api_key OWNER TO api_user;

--
-- Name: account_endpoint; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_endpoint (
    account_endpoint_id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_id uuid NOT NULL,
    endpoint_id uuid NOT NULL,
    params jsonb DEFAULT '{}'::jsonb NOT NULL,
    run_frequency_secs integer DEFAULT 300 NOT NULL,
    error text,
    last_run_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.account_endpoint OWNER TO postgres;

--
-- Name: COLUMN account_endpoint.params; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.account_endpoint.params IS '@type:InjectedAccountEndpointParams';


--
-- Name: account_endpoint; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.account_endpoint AS
 SELECT account_endpoint.account_endpoint_id,
    account_endpoint.account_id,
    account_endpoint.endpoint_id,
    account_endpoint.params,
    account_endpoint.run_frequency_secs,
    account_endpoint.error,
    account_endpoint.last_run_at,
    account_endpoint.created_at
   FROM public.account_endpoint;


ALTER TABLE api.account_endpoint OWNER TO api_user;

--
-- Name: account_tree; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_tree (
    account_tree_id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_id uuid NOT NULL,
    tree_id uuid NOT NULL,
    state jsonb DEFAULT '{}'::jsonb NOT NULL,
    complete boolean DEFAULT false NOT NULL,
    last_modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.account_tree OWNER TO postgres;

--
-- Name: tree; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tree (
    tree_id uuid DEFAULT gen_random_uuid() NOT NULL,
    tree_num integer NOT NULL,
    tree_name text,
    tree_key text,
    owner_id uuid NOT NULL,
    tree_def jsonb NOT NULL,
    public boolean DEFAULT false NOT NULL,
    last_modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.tree OWNER TO postgres;

--
-- Name: account_tree; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.account_tree AS
 SELECT account_tree.account_tree_id,
    account_tree.account_id,
    account_tree.tree_id,
    account_tree.state,
    account_tree.complete,
    account_tree.last_modified_at,
    account_tree.created_at,
    ( SELECT tree.tree_key
           FROM public.tree
          WHERE (tree.tree_id = account_tree.tree_id)) AS tree_key,
    ( SELECT tree.tree_name
           FROM public.tree
          WHERE (tree.tree_id = account_tree.tree_id)) AS tree_name,
    ( SELECT ((account.account_name || '/'::text) || ( SELECT tree.tree_key
                   FROM public.tree
                  WHERE (tree.tree_id = account_tree.tree_id)))
           FROM public.account
          WHERE (account.account_id = account_tree.account_id)) AS tree_path
   FROM public.account_tree;


ALTER TABLE api.account_tree OWNER TO api_user;

--
-- Name: endpoint; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endpoint (
    endpoint_id uuid DEFAULT gen_random_uuid() NOT NULL,
    endpoint_name text NOT NULL,
    endpoint_key text NOT NULL,
    endpoint_options public.endpoint_options_jsonb,
    endpoint_url text,
    official boolean DEFAULT false NOT NULL,
    owner_account_id uuid,
    public boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.endpoint OWNER TO postgres;

--
-- Name: endpoint; Type: VIEW; Schema: api; Owner: postgres
--

CREATE VIEW api.endpoint AS
 SELECT endpoint.endpoint_id,
    endpoint.endpoint_name,
    endpoint.endpoint_key,
    endpoint.endpoint_options,
    endpoint.endpoint_url,
    endpoint.official,
    endpoint.owner_account_id,
    endpoint.public,
    endpoint.created_at
   FROM public.endpoint;


ALTER TABLE api.endpoint OWNER TO postgres;

--
-- Name: meter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meter (
    meter_id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_id uuid NOT NULL,
    endpoint_id uuid,
    endpoint_name text,
    meter_name text NOT NULL,
    meter_key text NOT NULL,
    description text NOT NULL,
    output_type text NOT NULL,
    output jsonb,
    last_modified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.meter OWNER TO postgres;

--
-- Name: meter; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.meter AS
 SELECT meter.meter_id,
    meter.account_id,
    meter.endpoint_id,
    meter.endpoint_name,
    meter.meter_name,
    meter.meter_key,
    meter.description,
    meter.output_type,
    meter.output,
    meter.last_modified_at,
    meter.created_at
   FROM public.meter;


ALTER TABLE api.meter OWNER TO api_user;

--
-- Name: account; Type: VIEW; Schema: super_api; Owner: postgres
--

CREATE VIEW super_api.account AS
 SELECT account.account_id,
    account.account_num,
    account.account_name,
    account.email,
    account.auth0_id,
    account.last_active_at,
    account.created_at
   FROM public.account;


ALTER TABLE super_api.account OWNER TO postgres;

--
-- Name: meter; Type: VIEW; Schema: super_api; Owner: postgres
--

CREATE VIEW super_api.meter AS
 SELECT meter.meter_id,
    meter.account_id,
    meter.endpoint_id,
    meter.endpoint_name,
    meter.meter_name,
    meter.meter_key,
    meter.description,
    meter.output_type,
    meter.output,
    meter.last_modified_at,
    meter.created_at
   FROM public.meter;


ALTER TABLE super_api.meter OWNER TO postgres;

--
-- Name: tree; Type: VIEW; Schema: api; Owner: api_user
--

CREATE VIEW api.tree AS
 SELECT tree.tree_id,
    tree.tree_name,
    tree.tree_key,
    tree.owner_id,
    tree.tree_def,
    tree.public,
    tree.last_modified_at,
    tree.created_at,
    ( SELECT ((account.account_name || '/'::text) || tree.tree_key)
           FROM super_api.account
          WHERE (account.account_id = tree.owner_id)) AS tree_path,
    ( SELECT account.account_name
           FROM super_api.account
          WHERE (account.account_id = tree.owner_id)) AS owner_name,
    ( SELECT jsonb_object_agg(requirements.meter_key, ( SELECT jsonb_build_object('meter_name', meter.meter_name, 'meter_key', meter.meter_key, 'endpoint_name', meter.endpoint_name, 'endpoint_id', meter.endpoint_id, 'description', meter.description, 'output_type', meter.output_type) AS jsonb_build_object
                   FROM super_api.meter
                  WHERE ((meter.meter_key = requirements.meter_key) AND (meter.account_id = tree.owner_id)))) AS jsonb_object_agg
           FROM ( SELECT jsonb_object_keys(((tree.tree_def -> tree_names_set.tree_name) -> 'requirements'::text)) AS meter_key
                   FROM ( SELECT jsonb_object_keys(tree.tree_def) AS tree_name) tree_names_set) requirements) AS owner_meter_defs
   FROM public.tree;


ALTER TABLE api.tree OWNER TO api_user;

--
-- Name: account_account_num_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_account_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_account_num_seq OWNER TO postgres;

--
-- Name: account_account_num_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_account_num_seq OWNED BY public.account.account_num;


--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pgmigrations_id_seq OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: tree_tree_num_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tree_tree_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tree_tree_num_seq OWNER TO postgres;

--
-- Name: tree_tree_num_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tree_tree_num_seq OWNED BY public.tree.tree_num;


--
-- Name: account_api_key; Type: VIEW; Schema: super_api; Owner: postgres
--

CREATE VIEW super_api.account_api_key AS
 SELECT account_api_key.account_api_key_id,
    account_api_key.account_id,
    account_api_key.key_string,
    account_api_key.purpose,
    account_api_key.last_used_at,
    account_api_key.created_at
   FROM public.account_api_key;


ALTER TABLE super_api.account_api_key OWNER TO postgres;

--
-- Name: account account_num; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN account_num SET DEFAULT nextval('public.account_account_num_seq'::regclass);


--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Name: tree tree_num; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tree ALTER COLUMN tree_num SET DEFAULT nextval('public.tree_tree_num_seq'::regclass);


--
-- Name: account account_account_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_account_name_key UNIQUE (account_name);


--
-- Name: account account_account_num_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_account_num_key UNIQUE (account_num);


--
-- Name: account_api_key account_api_key_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_api_key
    ADD CONSTRAINT account_api_key_pkey PRIMARY KEY (account_api_key_id);


--
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account_endpoint account_endpoint_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_endpoint
    ADD CONSTRAINT account_endpoint_pkey PRIMARY KEY (account_endpoint_id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- Name: account_tree account_tree_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_tree
    ADD CONSTRAINT account_tree_pkey PRIMARY KEY (account_tree_id);


--
-- Name: endpoint endpoint_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endpoint
    ADD CONSTRAINT endpoint_pkey PRIMARY KEY (endpoint_id);


--
-- Name: meter meter_account_id_meter_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meter
    ADD CONSTRAINT meter_account_id_meter_key_key UNIQUE (account_id, meter_key);


--
-- Name: meter meter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meter
    ADD CONSTRAINT meter_pkey PRIMARY KEY (meter_id);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: tree tree_owner_id_tree_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_owner_id_tree_key_key UNIQUE (owner_id, tree_key);


--
-- Name: tree tree_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_pkey PRIMARY KEY (tree_id);


--
-- Name: tree tree_tree_num_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_tree_num_key UNIQUE (tree_num);


--
-- Name: account_tree account_tree_change_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER account_tree_change_last_modified_trigger BEFORE UPDATE ON public.account_tree FOR EACH ROW EXECUTE FUNCTION public.change_last_modified();


--
-- Name: account create_new_account_api_key_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER create_new_account_api_key_trigger AFTER INSERT ON public.account FOR EACH ROW EXECUTE FUNCTION public.create_new_account_api_key();


--
-- Name: meter meter_limit_checker_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER meter_limit_checker_trigger BEFORE INSERT ON public.meter FOR EACH ROW EXECUTE FUNCTION public.meter_limit_checker();


--
-- Name: account new_account_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER new_account_trigger BEFORE INSERT ON public.account FOR EACH ROW EXECUTE FUNCTION public.new_account();


--
-- Name: tree new_tree_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER new_tree_trigger BEFORE INSERT ON public.tree FOR EACH ROW EXECUTE FUNCTION public.new_tree();


--
-- Name: tree tree_change_last_modified_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tree_change_last_modified_trigger BEFORE UPDATE ON public.tree FOR EACH ROW EXECUTE FUNCTION public.change_last_modified();


--
-- Name: account_api_key account_api_key_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_api_key
    ADD CONSTRAINT account_api_key_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- Name: account_endpoint account_endpoint_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_endpoint
    ADD CONSTRAINT account_endpoint_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- Name: account_endpoint account_endpoint_endpoint_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_endpoint
    ADD CONSTRAINT account_endpoint_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoint(endpoint_id);


--
-- Name: account_tree account_tree_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_tree
    ADD CONSTRAINT account_tree_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- Name: account_tree account_tree_tree_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_tree
    ADD CONSTRAINT account_tree_tree_id_fkey FOREIGN KEY (tree_id) REFERENCES public.tree(tree_id);


--
-- Name: endpoint endpoint_owner_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endpoint
    ADD CONSTRAINT endpoint_owner_account_id_fkey FOREIGN KEY (owner_account_id) REFERENCES public.account(account_id);


--
-- Name: meter meter_endpoint_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meter
    ADD CONSTRAINT meter_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoint(endpoint_id);


--
-- Name: tree tree_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tree
    ADD CONSTRAINT tree_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.account(account_id);


--
-- Name: account; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;

--
-- Name: account account_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY account_access ON public.account TO api_user USING ((account_id = public.auth_account_id()));


--
-- Name: account_api_key; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.account_api_key ENABLE ROW LEVEL SECURITY;

--
-- Name: account_api_key account_api_key_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY account_api_key_access ON public.account_api_key TO api_user USING ((account_id = public.auth_account_id()));


--
-- Name: account_endpoint; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.account_endpoint ENABLE ROW LEVEL SECURITY;

--
-- Name: account_endpoint account_endpoint_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY account_endpoint_access ON public.account_endpoint TO api_user USING ((account_id = public.auth_account_id()));


--
-- Name: account_tree; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.account_tree ENABLE ROW LEVEL SECURITY;

--
-- Name: account_tree account_tree_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY account_tree_access ON public.account_tree TO api_user USING ((account_id = public.auth_account_id()));


--
-- Name: endpoint; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.endpoint ENABLE ROW LEVEL SECURITY;

--
-- Name: endpoint endpoint_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY endpoint_access ON public.endpoint TO api_user USING ((official OR public OR (owner_account_id = public.auth_account_id())));


--
-- Name: meter; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.meter ENABLE ROW LEVEL SECURITY;

--
-- Name: meter meter_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY meter_access ON public.meter TO api_user USING ((account_id = public.auth_account_id()));


--
-- Name: tree; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tree ENABLE ROW LEVEL SECURITY;

--
-- Name: tree tree_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY tree_access ON public.tree TO api_user USING ((public OR (owner_id = public.auth_account_id())));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO api_user;


--
-- Name: SCHEMA super_api; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA super_api TO api_user;


--
-- Name: TABLE account; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.account TO api_user;


--
-- Name: TABLE account_api_key; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.account_api_key TO api_user;


--
-- Name: TABLE account_endpoint; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.account_endpoint TO api_user;


--
-- Name: TABLE account_tree; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.account_tree TO api_user;


--
-- Name: TABLE tree; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tree TO api_user;


--
-- Name: TABLE endpoint; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.endpoint TO api_user;


--
-- Name: TABLE meter; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.meter TO api_user;


--
-- Name: TABLE account; Type: ACL; Schema: super_api; Owner: postgres
--

GRANT SELECT ON TABLE super_api.account TO api_user;


--
-- Name: TABLE meter; Type: ACL; Schema: super_api; Owner: postgres
--

GRANT SELECT ON TABLE super_api.meter TO api_user;


--
-- Name: SEQUENCE account_account_num_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.account_account_num_seq TO api_user;


--
-- Name: TABLE pgmigrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.pgmigrations TO api_user;


--
-- Name: SEQUENCE pgmigrations_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.pgmigrations_id_seq TO api_user;


--
-- Name: SEQUENCE tree_tree_num_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.tree_tree_num_seq TO api_user;


--
-- Name: TABLE account_api_key; Type: ACL; Schema: super_api; Owner: postgres
--

GRANT SELECT ON TABLE super_api.account_api_key TO api_user;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--
