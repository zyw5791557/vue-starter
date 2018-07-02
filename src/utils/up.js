/* eslint-disable no-undef */
import * as types from '@/store/mutation-types.js';
import store from '@/store';
var progress = function (p) {
    return function (done) {
        store.commit(types.UPDATE_PROGRESS_VALUE, parseInt(p * 100));
        if (p === 1) {
            store.commit(types.UPDATE_PROGRESS_DIALOG, false);
        }
        done();
    };
};

export const uploadFileMD5 = (file, iconID, callback) => {
    store.commit(types.UPDATE_PROGRESS_DIALOG, true);
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 2097152, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();
    let _originName = file.name;
    fileReader.onload = function (e) {
        spark.append(e.target.result); // Append array buffer
        currentChunk++;
        if (currentChunk < chunks) {
            _loadNext();
        } else {
            let _fileMd5 = spark.end();
            let storeAs = '/icon/' + _fileMd5;

            OSS.urllib.request(process.env.VUE_APP_OSS_TOKEN_HOST + '/sts/token', {
                method: 'GET'
            },
            function (err, response) {
                if (err) {
                    return alert(err);
                }
                try {
                    var result = JSON.parse(response);
                } catch (e) {
                    return alert('parse sts response info error: ' + e.message);
                }
                let _endpoint = 'oss-cn-hangzhou.aliyuncs.com';
                let _bucket = 'sz-asset-new';

                let client = new OSS.Wrapper({
                    accessKeyId: result.AccessKeyId,
                    accessKeySecret: result.AccessKeySecret,
                    stsToken: result.SecurityToken,
                    endpoint: _endpoint,
                    bucket: _bucket
                });
                client.multipartUpload(storeAs, file, {
                    progress: progress,
                    mime: file.type
                }).then(function (result) {
                    result['origin_name'] = _originName;
                    result['file_md5'] = _fileMd5;
                    callback(result, iconID);
                }).catch(function (err) {
                    console.error('图片上传异常：', err);
                    throw err;
                });
            }
            );
        }
    };

    fileReader.onerror = function () {
        console.warn('文件读取异常.');
    };

    function _loadNext () {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    _loadNext();
}

export const uploadFile = (file, callback) => {
    store.commit(types.UPDATE_PROGRESS_DIALOG, true);
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 2097152, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        fileReader = new FileReader();
    let _originName = file.name;
    fileReader.onload = function (e) {
        currentChunk++;
        if (currentChunk < chunks) {
            _loadNext();
        } else {
            let storeAs = '/vedio/' + _originName;

            OSS.urllib.request(process.env.VUE_APP_OSS_TOKEN_HOST + '/sts/token', {
                method: 'GET'
            },
            function (err, response) {
                if (err) {
                    return alert(err);
                }
                try {
                    var result = JSON.parse(response);
                } catch (e) {
                    return alert('parse sts response info error: ' + e.message);
                }
                let _endpoint = 'oss-cn-hangzhou.aliyuncs.com';
                let _bucket = 'sz-asset-new';
                let client = new OSS.Wrapper({
                    accessKeyId: result.AccessKeyId,
                    accessKeySecret: result.AccessKeySecret,
                    stsToken: result.SecurityToken,
                    endpoint: _endpoint,
                    bucket: _bucket
                });

                client.multipartUpload(storeAs, file, {
                    progress: progress,
                    mime: file.type
                }).then(function (result) {
                    result['origin_name'] = _originName;
                    callback(result);
                }).catch(function (err) {
                    console.error('文件上传异常：', err);
                    throw err;
                });
            }
            );
        }
    };

    fileReader.onerror = function () {
        console.warn('文件读取异常.');
    };

    function _loadNext () {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    _loadNext();
}
