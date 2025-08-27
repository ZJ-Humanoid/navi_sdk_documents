# zj_humanoid


## lowerlimb

> version:1.0.0


### MSG

#### `ContactInfo`

```bash
std_msgs/Header header
float32[] cmdContactFlag
float32[] estContactFlag
float32[] fusionProbability
float32[] swingPhase
float32[] stancePhase
float32[] endEffectorCurrentPositionZ
float32[] contactForceZ
float32[] pPhase
float32[] pHeight
float32[] pForce


```
#### `JointInfo`

```bash
std_msgs/Header header
float32[] jointsCurrentPosition
float32[] jointsCurrentVelocity
float32[] jointsCurrentTorque
float32[] jointsTargetPosition # after mpc optimized
float32[] jointsTargetVelocity # after mpc optimized
float32[] jointsTargetTorque # after mpc optimized

```
#### `EndOffectorInfo`

```bash
std_msgs/Header header
float32[] endEffectorCurrentForce
float32[] endEffectorCurrentPosition
float32[] endEffectorCurrentVelocity
float32[] endEffectorTargetForce
float32[] endEffectorTargetPosition
float32[] endEffectorTargetVelocity


```
#### `BaseInfo`

```bash
std_msgs/Header header
float32[] baseCurrentPose  # state estimated: euler angle(ZYX), base position
float32[] baseCurrentTwistWrtBody # state estimated: angular velocity, linear velocity
float32[] baseCurrentTwistWrtWorld
float32[] baseTargetPose  # mpc optimized: euler angle(ZYX), base position
float32[] baseTargetTwistWrtBody # mpc optimized: angular velocity, linear velocity
float32[] baseTargetTwistWrtWorld

```
#### `MotorInfo`

```bash
std_msgs/Header header
float32[] motorsCurrentPosition
float32[] motorsCurrentVelocity
float32[] motorsCurrentTorque
float32[] motorsCurrentTempreture
float32[] motorsCurrent
float32[] motorsTargetPosition # after mpc optimized
float32[] motorsTargetVelocity # after mpc optimized
float32[] motorsTargetTorque # after mpc optimized

```
#### `WBCCommand`

```bash
std_msgs/Header header
float32[] wbc_planned_torque
float32[] wbc_planned_joint_acc
float32[] wbc_planned_body_acc
float32[] wbc_planned_contact_force
float32[] wbc_planned_joint_pos
float32[] wbc_planned_joint_vel

```

## manipulation

> version:1.0.0


### MSG

#### `ObjPose`

```bash
# ros message for object pose 

string label  # label of object 
geometry_msgs/Pose pose  # pose of object in camera frame
```
#### `Grasp6d`

```bash
# ros message for one 6d grasp planning result

string label    # Object label
float32 score   # Grasp score
float32 width   # Grasp width
float32 depth   # Grasp depth
float32[] rotation_matrix  # Rotation matrix of predict grasp in camera frame, order in row [T_00, T_01, T_02, T_10, T_11, ...], length=9x1
float32[] translation  # Translation of predict grasp in camera frame, order in row [T_x, T_y, T_z], length=3x1
```
#### `DetItem`

```bash
# ros message for one detect result

string label   # Object label
float32 confidence   # Detection confidence
int16[4] bbox   # Detection bounding box, [x1, y1, x2, y2]
sensor_msgs/Image mask   # Mask image  

```

### SRV

#### `InstSeg`

```bash
# instance segmentation service

string[] labels   # Objects need to be segmented
sensor_msgs/Image color_image    # color image of scene
sensor_msgs/Image depth_image    # depth image of scene
---
bool have_objs    # flag of whether objects deteced
manipulation/DetItem[] items    # message from segmentation, each item including label, confidence, bbox and mask
```
#### `GraspTeach`

```bash
string which_arm
string object_label
---
bool success
string message
```
#### `GetTrajectory`

```bash
string which_arm
std_msgs/Float32MultiArray joint_data
---
bool success
trajectory_msgs/JointTrajectory ros_trajectory

```
#### `CameraCalibration`

```bash
string camera_name
string purpose
string mode
bool visualize
---
bool success
string message
```
#### `PoseEst`

```bash
# object pose estimation service 

sensor_msgs/Image color_image   # color image of scene
sensor_msgs/Image depth_image   # depth image of scene
manipulation/DetItem[] items    # message from segmentation, each item including label, confidence, bbox and mask
---
manipulation/ObjPose[] obj_poses   # the list of estimated poses, including object labels and estimated poses 

```
#### `GetScenePose`

```bash
int16 scene_id
---
string which_scene
bool[] success
geometry_msgs/Pose[] scene_poses

```
#### `ExecutePickTask`

```bash
# Request
string target_label     # 要抓取的目标物体的标签，例如 "chip_can_ori"
---
# Response
bool success            # 指示整个抓取-放置流程是否成功
string message          # 提供额外的信息，例如成功或失败的原因
```

### ACTION

#### `InstSeg`

```bash
# Goal
string[] labels   
---
# Result
bool success
---
# Feedback
# bool have_objs
int32 status  
sensor_msgs/Image color_image    
sensor_msgs/Image depth_image   
manipulation/DetItem[] items

```
#### `Track`

```bash
# Goal 
string label      
---
# Result
bool success


---
# Feedback
string info    

```
#### `Place`

```bash
# Goal 
manipulation/ObjPose obj_pose 
  
---
# Result
bool success
---
# Feedback
string info    

```
#### `LoosenHand`

```bash
# Goal
string task_goal   # 任意传

---
# Result
string success   # 任意传

---
# Feedback
bool loosen_hand_flag  # True表示机器人末端附近 xx cm 内有 人的手，false则表示没有

```
#### `Pick`

```bash
# Goal 
manipulation/ObjPose obj_pose 
---
# Result
bool success
string hand
---
# Feedback
string info    

```
#### `Search_object`

```bash
# Goal
string[] labels  

---
# Result
bool success

---
# Feedback
string info

```

## upperlimb

> version:1.0.0


### MSG

#### `Pose`

```bash
Header header                          # 当前时间戳
geometry_msgs/Point position           # [x, y, z]
geometry_msgs/Quaternion quaternion    # 四元素
float64[3] rpy_rad                     # [r, p, y]     弧度
float64[3] rpy_deg                     # [r, p, y]     角度



# RPY  定轴X-Y-Z旋转  绕动轴Z-Y-X旋转
```
#### `DualPose`

```bash
geometry_msgs/Pose left_arm_pose        # 左臂数据
geometry_msgs/Pose right_arm_pose       # 右臂数据
```
#### `Joints`

```bash
float64[] joint         # 由于会存在多个关节的同时运动，所以该数据长度不能为7
```
#### `SpeedL`

```bash
float64[] tcp_speed    # 目标末端速度，末端平动速度[m/s]，末端转动角速度[rad/s]
float64 acc            # 最大加速度




# vx1, vy1, vz1, vrx1, vry1, vrz1
# vx2, vy2, vz2, vrx2, vry2, vrz2
# vx1, vy1, vz1, vrx1, vry1, vrz1, vx2, vy2, vz2, vrx2, vry2, vrz2
```
#### `TcpSpeed`

```bash
Header header
float64[6] left_arm          # 左臂TCP速度信息
float64[6] right_arm         # 右臂TCP速度信息






# -----------------------------------------------
# left_arm:  [vx, vy, vz, ωx, ωy, ωz] 
# right_arm: [vx, vy, vz, ωx, ωy, ωz]


# 其中 vx, vy, vz 单位为[m/s]
# 其中 ωx, ωy, ωz 单位为[rad/s]
```
#### `UplimbState`

```bash
Header header                      # 当前时间戳
int8 cmd_num                       # 当前运行状态码
string cmd_name                    # 当前运行状态名称
bool left_arm_is_singular          # 当前左臂是否奇异
bool right_arm_is_singular         # 当前右臂是否奇异







# -----------------------------------------------------------------
# 0为停止状态，
# 1为MOVEJ，
# 2为MOVEJ_PATH，
# 3为MOVEL_NULLSPACE，
# 4为MOVEL， 
# 5为MOVEL_PATH，
# 6为SPEEDJ，
# 7为SPEEDL，
# 8为SPEED_STOP，
# 9为MOVECSVFILE，
# 10为MOVEFOURIER，
# 11为MOVEJ_SPLINE，
# 12为TEACH，
# 13为SERVOJ，
# 14为SERVOL。
# -----------------------------------------------------------------

```
#### `SpeedJ`

```bash
float64[] joint_speed    # 目标关节速度
float64 acc              # 最大加速度       
int8 arm_type            # 机器人身体部位







# -----------------------------------------------------------------
# joints数据维度定义:
# 左臂:7维
# 右臂:7维
# 颈部:2维
# 腰部:有1维和2维,具体看实际的机器人型号
# 升降:1维

# 机器人型号维度定义:
# 仅双臂:14维
# 双臂+颈部:2维
# 双臂+颈部+腰部1维:17
# 双臂+颈部+腰部2维:18
# 双臂+颈部+腰部2维+升降:19
# -----------------------------------------------------------------


# -----------------------------------------------------------------
# arm_type 8421码定义:
# 左臂为1,右臂为2,颈部为4,半身腰为8,轮臂腰上下平移为16
# 
# 
# 不同机型可以使用的部位:
# - 半身带腰：左臂为1，右臂为2，颈部为4， 半身腰为8。
# - 半身不带腰：左臂为1，右臂为2，颈部为4。
# - 轮臂：左臂为1，右臂为2，颈部为4，轮臂腰为8，轮臂腰上下平移为16。
# -----------------------------------------------------------------
```

### SRV

#### `MoveJByPose`

```bash
geometry_msgs/Pose[2] pose                # 对应的目标位姿     当调用左臂或右臂服务时,始终使用索引为0的数据;当调用双臂服务时，索引0为左臂,索引1为右臂 。
float64[2] q7                             # 第七关节角度       当调用左臂或右臂服务时,始终使用索引为0的数据;当调用双臂服务时，索引0为左臂,索引1为右臂。
float64 v                                 # 最大速度
float64 acc                               # 最大加速度
bool async                                # 执行方式 true:立即返回,并且可以被打断;false:阻塞执行,等待执行完成后返回.
---
bool success                              # 执行结果,该结果只反映命令的调用结果,并不能代表动作是否执行到位   
string message                            # 提示信息





```
#### `MoveLByPath`

```bash
geometry_msgs/Pose[] left_arm_path              # 位姿数组,当控制单臂时始终使用索引为0的数据,当控制双臂时索引0为左臂,索引1为右臂 
geometry_msgs/Pose[] right_arm_path             # 位姿数组,当控制单臂时始终使用索引为0的数据,当控制双臂时索引0为左臂,索引1为右臂 
float64 time                                    # 运行总时间 [s]    当指定总时间时 忽略时间戳参数
float64[] timestamp                             # 每一个关节角路径对应的时间戳 [s]
bool async                                      # 是否同步运行
---
bool success
string message
```
#### `IK`

```bash
geometry_msgs/Pose pose           # tcp的位姿
float64 q7                        # 第七关节角
---
bool success                      # 是否有解
string message                    # 提示信息
int32 nums                        # 解的数量
upperlimb/Joints[] joints       # 关节角
float64[] phi                     # 臂角,索引与逆解后的关节角对应


```
#### `ArmType`

```bash
int8 arm_type               # 机器人类型,使用8421叠加使用
---
bool success
string message



# -----------------------------------------------------------------
# arm_type 8421码定义:
# 左臂为1,右臂为2,颈部为4,半身腰为8,轮臂腰上下平移为16
# 
# 
# 不同机型可以使用的部位:
# - 半身带腰：左臂为1，右臂为2，颈部为4， 半身腰为8。
# - 半身不带腰：左臂为1，右臂为2，颈部为4。
# - 轮臂：左臂为1，右臂为2，颈部为4，轮臂腰为16，轮臂腰上下平移为8。
# -----------------------------------------------------------------
```
#### `FK`

```bash
float64[] joints                # 关节角
---
bool success
string message
geometry_msgs/Pose pose         # tcp的位姿



# 关节角需要不全所有的数据
```
#### `MoveL`

```bash
geometry_msgs/Pose[2] pose              # 位姿数组,当控制单臂时始终使用索引为0的数据,当控制双臂时索引0为左臂,索引1为右臂 
float64 v                               # 最大关节速度  [rad/s]
float64 acc                             # 最大加速度    [rad/s^2]
bool async                              # 执行方式 true:立即返回,并且可以被打断;false:阻塞执行,等待执行完成后返回.
---
bool success                            # 执行结果,该结果只反映命令的调用结果,并不能代表动作是否执行到位   
string message                          # 提示信息





# 
# 注意
#   - 基坐标系位于URDF中的第一个连杆的坐标系，左臂末端坐标系位于“TCP_L”，右臂末端坐标系位于“TCP_R”。

```
#### `Servo`

```bash
float64 v                       # 最大速度, 最大速度，此版本无效，默认写入0.0。  [rad/s]
float64 acc                     # 最大加速度，此版本无效，默认写入0.0。 [rad/s^2]
float64 time                    # 执行时间, 间隔点之间的运行时间
float64 lookahead_time          # 前瞻时间, 此版本无效, 默认写入0.2
int32 gain                      # 位置跟踪参数，该参数越大，跟踪越慢，超调量越小，范围[100, 1000]
int8 arm_type                   # 机器人身体部位。 仅当使用V1版本且全身控制时有用,用来指定当前要控制的目标部位,可以通过8421码进行叠加
---
bool success
string message





# -----------------------------------------------------------------
# arm_type 8421码定义:
# 左臂为1,右臂为2,颈部为4,半身腰为8,轮臂腰上下平移为16
# 
# 
# 不同机型可以使用的部位:
# - 半身带腰：左臂为1，右臂为2，颈部为4， 半身腰为8。
# - 半身不带腰：左臂为1，右臂为2，颈部为4。
# - 轮臂：左臂为1，右臂为2，颈部为4，轮臂腰为8，轮臂腰上下平移为16。
# -----------------------------------------------------------------
```
#### `MoveJ`

```bash
float64[] joints                       # 对应的关节数据维度,详情参考下方
float64 v                              # 最大速度
float64 acc                            # 最大加速度
float64 t                              # 从当前位置到目标位置的总时长;当给定该参数的时候,忽略v和acc参数.
bool async                             # 执行方式 true:立即返回,并且可以被打断;false:阻塞执行,等待执行完成后返回.
int8 arm_type                          # 机器人身体部位。 仅当使用V1版本且全身控制时有用,用来指定当前要控制的目标部位,可以通过8421码进行叠加
---
bool success                            # 执行结果,该结果只反映命令的调用结果,并不能代表动作是否执行到位   
string message                          # 提示信息





# -----------------------------------------------------------------
# joints数据维度定义:
# 左臂:7维
# 右臂:7维
# 颈部:2维
# 腰部:有1维和2维,具体看实际的机器人型号
# 升降:1维

# 机器人型号维度定义:
# 仅双臂:14维
# 双臂+颈部:2维
# 双臂+颈部+腰部1维:17
# 双臂+颈部+腰部2维:18
# 双臂+颈部+腰部2维+升降:19
# -----------------------------------------------------------------


# -----------------------------------------------------------------
# arm_type 8421码定义:
# 左臂为1,右臂为2,颈部为4,半身腰为8,轮臂腰上下平移为16
# 
# 
# 不同机型可以使用的部位:
# - 半身带腰：左臂为1，右臂为2，颈部为4， 半身腰为8。
# - 半身不带腰：左臂为1，右臂为2，颈部为4。
# - 轮臂：左臂为1，右臂为2，颈部为4，轮臂腰为16，轮臂腰上下平移为8。
# -----------------------------------------------------------------
```
#### `MoveJByPath`

```bash
upperlimb/Joints[] path               # 关节角路径,
float64 time                            # 运行总时间。  [s]    到达最后一个路径点所需的时间. 当指定总时间时 忽略时间戳参数
float64[] timestamp                     # 时间戳。     [s]    每一个关节角路径对应的时间戳
bool async                              # 是否同步运行
int8 arm_type                           # 机器人身体部位。 仅当使用V1版本且全身控制时有用,用来指定当前要控制的目标部位,可以通过8421码进行叠加
---
bool success                            # 执行结果,该结果只反映命令的调用结果,并不能代表动作是否执行到位   
string message                          # 提示信息





# -----------------------------------------------------------------
# arm_type 8421码定义:
# 左臂为1,右臂为2,颈部为4,半身腰为8,轮臂腰上下平移为16
# 
# 
# 不同机型可以使用的部位:
# - 半身带腰：左臂为1，右臂为2，颈部为4， 半身腰为8。
# - 半身不带腰：左臂为1，右臂为2，颈部为4。
# - 轮臂：左臂为1，右臂为2，颈部为4，轮臂腰为16，轮臂腰上下平移为8。
# -----------------------------------------------------------------

```
#### `IsSingular`

```bash
float64[7] joints                     # 手臂关节
---
bool success
string message
bool is_singular                      # 请求的手臂关节是否在奇异位置
```

## navigation

> version:1.0.0


### MSG

#### `TaskInfo`

```bash
# TaskInfo.msg

std_msgs/Header header

Waypoint[] waypoints
```
#### `LocalMapData`

```bash
# LocalMapData.msg

bool occupancy # 是否占用
int8 semantic # 语义
bool dynamic # 是否是动态
float64 speed # 移动速度 m/s
float64 direction # 移动方向 [-pi, pi]
```
#### `LocalMap`

```bash
# LocalMap.msg

std_msgs/Header header
nav_msgs/MapMetaData info
LocalMapData[] data
```
#### `Waypoint`

```bash
# Waypoint.msg

int32 id
geometry_msgs/Pose pose
int32 action
int32 audio 
```
#### `PlanState`

```bash
# PlanState.msg


uint8 NONE = 0
uint8 STANDBY = 1
uint8 PLANNING = 2
uint8 RUNNING = 3
uint8 STOPPING = 4
uint8 FINISHED = 5
uint8 FAILURE = 6
uint8 value
```
#### `NavigationStatus`

```bash
# NavigationStatus.msg

std_msgs/Header header

PlanState state

```
