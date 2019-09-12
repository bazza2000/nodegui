pipeline {
  agent {
    node {
      label 'jenkins_build'
    }
  }
   options {
    timeout(time: 1, unit: 'HOURS')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '10', artifactDaysToKeepStr: '30', artifactNumToKeepStr: '10'))
    timestamps()
  }
  triggers {
    GenericTrigger(
     genericVariables: [
      [key: 'ref', value: '$.changes[:1].refId']
     ],
     
     causeString: 'Triggered on $ref',
     
     token: 'h4GZMNQZcXWklyMlhRls',
     
     printContributedVariables: true,
     
     printPostContent: true,
     
     silentResponse: false,
     
     regexpFilterText: '$ref',
     regexpFilterExpression: 'refs/heads/dev' 
    )
  }
  stages {
    stage('React Test') {
      agent {
        docker {
          image 'node:8.11.1'
          label 'jenkins_build'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        // Send Job Start Notification to Slack Channel.
        slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        sh 'npm install'
        sh 'npm --max_old_space_size=8000 test'
        // OWASP Dependency Check
        copyArtifacts(projectName: 'OWASP_Downloader');
        dependencyCheckAnalyzer scanpath: 'node_modules', \
                  outdir: 'depcheck/report', \
                  datadir: 'data', \
                  hintsFile: '', \
                  includeVulnReports: true, \
                  includeCsvReports: true, \
                  includeHtmlReports: true, \
                  includeJsonReports: true, \
                  isAutoupdateDisabled: true, \
                  skipOnScmChange: false, \
                  skipOnUpstreamChange: false, \
                  suppressionFile: '', \
                  zipExtensions: ''
        dependencyCheckPublisher canComputeNew: false, \
                  defaultEncoding: '', \
                  healthy: '', \
                  pattern: '', \
                  unHealthy: '', \
                  unstableTotalHigh : '0'
        archiveArtifacts allowEmptyArchive: true, artifacts: 'depcheck/report/dependency-check-*', onlyIfSuccessful: false
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
            sh 'docker build -f Dockerfile.CB -t docker.mgmt.co-test.cloud:8443/digitalauth_authn_bg907:CB-${BUILD_NUMBER} .'
            sh 'docker login  docker.mgmt.co-test.cloud:8443 -u ${BITBUCKET_COMMON_CREDS_USR} -p ${BITBUCKET_COMMON_CREDS_PSW}'
            sh 'docker push   docker.mgmt.co-test.cloud:8443/digitalauth_authn_bg907:CB-${BUILD_NUMBER}'
          }
        }
        stage('React Build/Push Smile') {
          steps {
            sh 'docker build -f Dockerfile.SM -t docker.mgmt.co-test.cloud:8443/digitalauth_authn_bg907:SM-${BUILD_NUMBER} .'
            sh 'docker login  docker.mgmt.co-test.cloud:8443 -u ${BITBUCKET_COMMON_CREDS_USR} -p ${BITBUCKET_COMMON_CREDS_PSW}'
            sh 'docker push   docker.mgmt.co-test.cloud:8443/digitalauth_authn_bg907:SM-${BUILD_NUMBER}'
          }
        }
      }
    }
  }
  environment {
    BITBUCKET_COMMON_CREDS  = credentials('jenkins-user-for-nexus-repository')
  }
  post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      build job: 'deploy_latest_versions_kube'
    }
    unstable {
      slackSend (color: '#FF00FF', message: "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      emailext body: "BUILD UNSTABLE: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \
      \n\nYou are using dependencies which have been identified by the national vulnerability database as HIGH severity. \
      \n\nThe Digital Authentication projects has a requirement for NO HIGH severity dependencies.  Please find an alternative. \
      \n\nYou can find more details about the failed dependencies by clicking the following URL: ${env.BUILD_URL} and selecting \
      \"Dependency-Check Vulnerabilities\" in the left hand menu\n\nMore details for the dependency checker can be found here: \
      https://adc-confluence.uk.capgemini.com/display/DIGP/OWASP+Dependency-Check#OWASPDependency-Check-Dependency-Check-Email",
        recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Jenkins Build UNSTABLE: Job ${env.JOB_NAME}"
      build job: 'deploy_latest_versions_kube'
    }
    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      emailext body: "BUILD FAILURE - please respect your colleagues by not committing broken code they will be blocked.\n\nFAILED: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
        recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Jenkins Build FAILED: Job ${env.JOB_NAME}"
    }
  }
}
