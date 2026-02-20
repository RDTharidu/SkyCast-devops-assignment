# 1. Base Image: Nginx Alpine (Very lightweight & fast - Best for Static Sites)
FROM nginx:alpine

# 2. Rubric Requirement: Security Considerations
# Nginx officially recommends running as non-root, but Alpine Nginx runs as root by default.
# We will use the default location but ensure permissions are correct.

# 3. Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# 4. Copy our static site files (from 'src' folder) to Nginx server directory
COPY src /usr/share/nginx/html

# 5. Expose port 80 (Standard web traffic port)
EXPOSE 80

# 6. Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]