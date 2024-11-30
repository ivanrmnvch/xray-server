XRAY_MANAGER = xray-manager

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

manager-build-dev:
	APP_MODE=development docker compose build --no-cache $(XRAY_MANAGER)

manager-dev:
	APP_MODE=development docker compose up --watch $(XRAY_MANAGER)

manager-stop:
	docker stop xray-manager \
	&& docker rm xray-manager

manager-rebuild:
	docker compose build --no-cache xray-manager
