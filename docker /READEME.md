

### 进入容器
```
docker exec -it 5f723a7b587f /bin/bash
```


## 容器数据卷
```
docker run -it --privileged=true -v /tmp/host_data:/tmp/doceker_data ubuntu /bin/bash
```
