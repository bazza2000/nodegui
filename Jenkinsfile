pipeline {
  agent any
  options {
    timeout(time: 1, unit: 'HOURS')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '10', artifactDaysToKeepStr: '30', artifactNumToKeepStr: '10'))
    timestamps()
  }
  triggers {
    GenericTrigger(
      genericVariables: [
        [key: 'ref', value: '$.ref']
      ],

      causeString: 'Triggered on $ref',

      token: 'nodegui',

      printContributedVariables: true,

      printPostContent: true,

      silentResponse: false,
    )
  }
  stages {
    stage('React Test') {
      agent {
        docker {
          image 'node:12.8.0'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'npm set strict-ssl false'
        sh 'npm install'
        sh 'npm --max_old_space_size=8000 test'
        sh 'npm run build'
        nexusPolicyEvaluation advancedProperties: '', failBuildOnNetworkError: false, iqApplication: selectedApplication('nodegui'), iqScanPatterns: [[scanPattern: '**/node_modules/*.js'], [scanPattern: '**/build/*.js']], iqStage: 'build', jobCredentialsId: 'jenkins-nexus'
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
      }
      post {
        always {
            junit 'target/surefire-reports/*.xml'
        }
      }
    }
    stage('Containerize') {
      steps {
        sh 'cp -rp /artifacts/target .'
        sh "/usr/bin/docker build -t  ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:${env.BUILD_ID} . "
        sh "/usr/bin/docker login  ${env.SERVICE_URL}:${env.SERVICE_PORT} -u ${GITHUB_ASH_CREDS_USR} -p ${GITHUB_ASH_CREDS_PSW}"
        sh "/usr/bin/docker push   ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:${BUILD_NUMBER}"
        sh "/usr/bin/docker tag   ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:${BUILD_NUMBER} ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:latest"
        sh "/usr/bin/docker push   ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:latest"
      }
    }
    stage('Update Kubernetes') {
      agent {
        label 'minikube'
      }
      steps {
        sh 'cd /root/new ; kubectl delete -f master.yaml'
        sh 'cd /root/new ; kubectl apply -f master.yaml'
      }
    }
    stage('Acceptance Test') {
      steps {
          build job: 'AcceptanceTest', parameters: [[$class: 'StringParameterValue', name: 'ParamA', value: "${env.BUILD_ID}"], [$class: 'StringParameterValue', name: 'ParamB', value: "${env.JOB_NAME}"]]
      }
    }
  }
  environment {
    SERVICE_URL = 'docker.viosystems.com'
    SERVICE_PORT = '8443'
    APP_NAME = 'authnservice'
    GITHUB_ASH_CREDS = credentials('jenkins-user-for-nexus-repository')
  }
  options {
    timeout(time: 1, unit: 'HOURS')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '10', artifactDaysToKeepStr: '30', artifactNumToKeepStr: '10'))
    timestamps()
  }
  triggers {
    GenericTrigger(genericVariables: [
                    [key: 'ref', value: '$.ref']
                  ], causeString: 'Triggered on $ref', token: 'authNservice', printContributedVariables: true, printPostContent: true, silentResponse: false)
    }
  }

      }
      post {
        always {
            junit 'junit.xml'
        }
      }
    }
    stage('React Build') {
      parallel {
        stage('React Build/Push PIBS') {
          steps {
            sh 'docker build -t docker.viosystems.com:8443/nodegui:${BUILD_NUMBER} .'
            sh 'docker login  docker.viosystems.com:8443 -u ${GITHUB_ASH_CREDS_USR} -p ${GITHUB_ASH_CREDS_PSW}'
            sh 'docker push   docker.viosystems.com:8443/nodegui:${BUILD_NUMBER}'
            sh 'docker tag   docker.viosystems.com:8443/nodegui:${BUILD_NUMBER} docker.viosystems.com:8443/nodegui:latest'
            sh 'docker push   docker.viosystems.com:8443/nodegui:latest'
          }
        }
      }
    }
  }
  environment {
    GITHUB_ASH_CREDS  = credentials('jenkins-user-for-nexus-repository')
  }
      post {
    success {
      build job: 'minikube_update'
    }
   }
}
