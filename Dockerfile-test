FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
ADD easylearn-test.conf /etc/nginx/conf.d/easylearn-test.conf
ADD cert.pem /opt/cert.pem
ADD key.pem /opt/key.pem
ADD dh2048.pem /opt/dh2048.pem

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
