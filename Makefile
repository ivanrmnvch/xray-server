init: copy-env init-folders init-files

copy-env:
	cd xray-manager && cp .env.example .env \
	&& cd ../xray-vpn && cp .env.example .env

init-folders:
	mkdir -p logs/xray \
    && mkdir -p config/xray

init-files:
	echo "" > logs/xray/access.log \
	&& echo "" > logs/xray/error.log \
	&& cp xray-vpn/config.example.json config/xray/config.json

manager-dev:
	docker compose up --watch xray-manager

manager-stop:
	docker stop xray-manager \
	&& docker rm xray-manager

manager-rebuild:
	docker compose build --no-cache xray-manager
