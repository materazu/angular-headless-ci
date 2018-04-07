FROM node:8

# Install OpenJDK 8
RUN echo 'deb http://deb.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list && \
     apt-get update && \
     apt-get install -y -t jessie-backports openjdk-8-jre-headless ca-certificates-java

# Install dependencies
RUN apt-get install -y gettext-base \
    libpangocairo-1.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libgconf2-4 \
    libasound2 \
    libatk1.0-0 \
    libgtk-3-0

# Install chrome
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && set -x && apt-get update && apt-get install -y xvfb google-chrome-stable \
    && wget -q -O /usr/bin/xvfb-chrome https://bitbucket.org/atlassian/docker-node-chrome-firefox/raw/ff180e2f16ea8639d4ca4a3abb0017ee23c2836c/scripts/xvfb-chrome \
    && ln -sf /usr/bin/xvfb-chrome /usr/bin/google-chrome \
    && chmod 755 /usr/bin/google-chrome

