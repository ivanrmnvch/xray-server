FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y init curl unzip supervisor && \
    curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh | bash && \
    apt purge -y curl unzip && \
    apt autoremove -y

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /usr/local/etc/xray

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
