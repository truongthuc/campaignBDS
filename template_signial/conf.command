#!/bin/bash
work_pass=$(dirname $0)
cd $work_pass
sass --watch scss:css --style compressed